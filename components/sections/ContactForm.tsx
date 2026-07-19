"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, X, ImagePlus } from "lucide-react";

const schema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Gültige E-Mail-Adresse eingeben"),
  address: z.string().optional(),
  description: z.string().min(10, "Bitte kurz beschreiben, was Sie benötigen"),
});

type FormData = z.infer<typeof schema>;

const STEPS = [
  { id: 1, title: "Wie können wir Sie erreichen?" },
  { id: 2, title: "Was benötigen Sie?" },
  { id: 3, title: "Alles korrekt?" },
];

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const next = async () => {
    const map: Record<number, (keyof FormData)[]> = { 1: ["email"], 2: ["description"] };
    const valid = await trigger(map[step]);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append("form-name", "contact");
    fd.append("bot-field", "");
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v));
    files.forEach((f) => fd.append("files", f));
    try {
      // Netlify Forms: die statische __forms.html registriert das Formular
      // beim Deploy, der eigentliche Versand läuft per AJAX über denselben Namen.
      const res = await fetch("/__forms.html", { method: "POST", body: fd });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const v = getValues();

  if (submitted) {
    return (
      <section id="anfrage" className="py-40 px-6 bg-[#0A0A0A]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="w-16 h-16 rounded-full bg-[#2D4A6B] flex items-center justify-center mx-auto mb-8"
          >
            <Check size={28} strokeWidth={1.5} className="text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[2.5rem] font-light tracking-tight text-white mb-4"
          >
            {v.name ? `Danke, ${v.name.split(" ")[0]}!` : "Vielen Dank!"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[15px] text-[#4B5563] leading-relaxed"
          >
            Wir melden uns innerhalb von{" "}
            <span className="text-white">24 Stunden</span> persönlich bei Ihnen.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section id="anfrage" className="py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.25em] text-[#4A7FA5] mb-5"
            >
              Anfrage
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2.2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight text-white mb-6"
            >
              Was können{" "}
              <br />
              <span className="font-[family-name:var(--font-playfair)] italic text-[#4A7FA5]">
                wir für Sie tun?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] text-[#4B5563] leading-relaxed max-w-sm"
            >
              Beschreiben Sie Ihr Anliegen — wir melden uns persönlich und kümmern uns um den Rest.
            </motion.p>

            {/* Step indicators */}
            <div className="hidden lg:flex flex-col gap-4 mt-16 border-t border-white/8 pt-10">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    s.id === step ? "opacity-100" : s.id < step ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      s.id < step ? "bg-[#2D4A6B]" : s.id === step ? "border border-[#4A7FA5]" : "border border-white/20"
                    }`}
                  >
                    {s.id < step ? (
                      <Check size={10} strokeWidth={2.5} className="text-white" />
                    ) : (
                      <span className="text-[9px] text-white/50">{s.id}</span>
                    )}
                  </div>
                  <span className={`text-[13px] ${s.id === step ? "text-white" : "text-white/40"}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex flex-col justify-center">
            {/* Progress */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#374151]">
                  Schritt {step} von 3
                </span>
              </div>
              <div className="h-px bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#2D4A6B]"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <Field label="E-Mail" required type="email" placeholder="ihre@email.ch" error={errors.email?.message} registration={register("email")} />
                  <Field label="Name" type="text" placeholder="Max Mustermann" registration={register("name")} />
                  <Field label="Telefon" hint="optional" type="tel" placeholder="+41 79 000 00 00" registration={register("phone")} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <Field label="Adresse" hint="optional" type="text" placeholder="Musterstrasse 12, 8001 Zürich" registration={register("address")} />

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4B5563]">Ihr Anliegen</label>
                      <span className="text-[10px] text-red-400 uppercase tracking-wider">Pflichtfeld</span>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Beschreiben Sie Ihr Anliegen — kein Fachwissen nötig..."
                      {...register("description")}
                      className={`w-full px-4 py-4 rounded-xl bg-white/5 border text-[14px] text-white placeholder-[#374151] outline-none resize-none transition-all duration-200 focus:border-[#4A7FA5] ${
                        errors.description ? "border-red-500/50" : "border-white/10"
                      }`}
                    />
                    {errors.description && <p className="text-[12px] text-red-400">{errors.description.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4B5563]">
                      Bilder <span className="normal-case tracking-normal text-[#374151]">— optional</span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border border-dashed border-white/10 rounded-xl p-5 flex items-center justify-center gap-3 cursor-pointer hover:border-white/20 transition-colors duration-200"
                    >
                      <ImagePlus size={15} strokeWidth={1.5} className="text-[#374151]" />
                      <span className="text-[13px] text-[#374151]">Klicken zum Hochladen</span>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                      const sel = Array.from(e.target.files || []);
                      setFiles((p) => [...p, ...sel].slice(0, 5));
                    }} />
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                            <span className="text-[11px] text-[#6B7280] max-w-[100px] truncate">{f.name}</span>
                            <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}>
                              <X size={10} className="text-[#4B5563]" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <p className="text-[13px] text-[#4B5563] mb-2">Bitte prüfen Sie Ihre Angaben.</p>
                  <div className="border-t border-white/8">
                    {[
                      { label: "E-Mail", value: v.email },
                      { label: "Name", value: v.name },
                      { label: "Telefon", value: v.phone },
                      { label: "Adresse", value: v.address },
                      { label: "Anliegen", value: v.description },
                    ].filter(r => r.value).map((row) => (
                      <div key={row.label} className="flex gap-6 py-4 border-b border-white/8">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[#374151] w-16 shrink-0 mt-0.5">{row.label}</span>
                        <span className="text-[13px] text-white leading-relaxed">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  {files.length > 0 && (
                    <p className="text-[12px] text-[#374151]">{files.length} Bild(er) beigefügt</p>
                  )}
                  <p className="text-[11px] text-[#374151] mt-2">
                    Ihre Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-between mt-10">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className={`text-[13px] text-[#374151] hover:text-white transition-colors duration-200 ${step === 1 ? "invisible" : ""}`}
              >
                ← Zurück
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] text-[13px] font-medium px-7 py-3 rounded-full hover:bg-[#F5F5F5] transition-colors duration-200"
                >
                  Weiter
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] text-[13px] font-medium px-7 py-3 rounded-full hover:bg-[#F5F5F5] transition-colors duration-200 disabled:opacity-50"
                >
                  {submitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Wird gesendet...</>
                  ) : (
                    <>Anfrage absenden</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, hint, required, type, placeholder, error, registration,
}: {
  label: string; hint?: string; required?: boolean; type: string; placeholder: string; error?: string; registration: object;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#4B5563]">{label}</label>
        {required && <span className="text-[10px] text-red-400 uppercase tracking-wider">Pflichtfeld</span>}
        {hint && <span className="text-[10px] text-[#374151]">{hint}</span>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...(registration as object)}
        className={`w-full px-4 py-4 rounded-xl bg-white/5 border text-[14px] text-white placeholder-[#374151] outline-none transition-all duration-200 focus:border-[#4A7FA5] ${
          error ? "border-red-500/50" : "border-white/10"
        }`}
      />
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
}
