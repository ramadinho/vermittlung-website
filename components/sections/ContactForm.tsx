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
  const [submitError, setSubmitError] = useState(false);
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
    setSubmitError(false);
    const fd = new FormData();
    fd.append("form-name", "contact");
    fd.append("bot-field", "");
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v));
    files.forEach((f) => fd.append("files", f));
    try {
      // Netlify Forms: die statische __forms.html registriert das Formular
      // beim Deploy, der eigentliche Versand läuft per AJAX über denselben Namen.
      // Achtung: funktioniert nur auf der echten Netlify-Domain, nicht im lokalen "next dev".
      const res = await fetch("/__forms.html", { method: "POST", body: fd });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const v = getValues();

  if (submitted) {
    return (
      <section id="anfrage" className="py-32 px-6 bg-gradient-to-br from-[#FB7B1F] to-[#DE4E09]">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl shadow-black/20 px-10 py-14 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.3, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#EA580C] flex items-center justify-center mx-auto mb-8"
            >
              <Check size={28} strokeWidth={1.5} className="text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[2.2rem] font-light tracking-tight text-[#0A0A0A] mb-4"
            >
              {v.name ? `Danke, ${v.name.split(" ")[0]}!` : "Vielen Dank!"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-[15px] text-[#6B7280] leading-relaxed"
            >
              Wir melden uns innerhalb von{" "}
              <span className="text-[#0A0A0A] font-medium">24 Stunden</span> persönlich bei Ihnen.
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="anfrage" className="py-32 px-6 bg-gradient-to-br from-[#FB7B1F] to-[#DE4E09]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — direkt auf Orange */}
          <div className="flex flex-col lg:sticky lg:top-28">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-5"
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
              <span className="font-[family-name:var(--font-playfair)] italic text-[#0A0A0A]">
                wir für Sie tun?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[15px] text-white/80 leading-relaxed max-w-sm"
            >
              Beschreiben Sie Ihr Anliegen — wir melden uns persönlich und kümmern uns um den Rest.
            </motion.p>

            {/* Step indicators */}
            <div className="hidden lg:flex flex-col gap-4 mt-16 border-t border-white/20 pt-10">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    s.id === step ? "opacity-100" : s.id < step ? "opacity-70" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      s.id < step ? "bg-white" : s.id === step ? "border-2 border-white" : "border border-white/40"
                    }`}
                  >
                    {s.id < step ? (
                      <Check size={11} strokeWidth={2.5} className="text-[#EA580C]" />
                    ) : (
                      <span className="text-[9px] text-white">{s.id}</span>
                    )}
                  </div>
                  <span className="text-[13px] text-white">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — weisse Karte für das eigentliche Formular */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl shadow-black/20 p-8 sm:p-10"
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#94A3B8]">
                  Schritt {step} von 3
                </span>
              </div>
              <div className="h-1.5 bg-[#F1F1F1] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#EA580C] rounded-full"
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
                      <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#374151]">Ihr Anliegen</label>
                      <span className="text-[10px] text-[#EA580C] uppercase tracking-wider">Pflichtfeld</span>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Beschreiben Sie Ihr Anliegen — kein Fachwissen nötig..."
                      {...register("description")}
                      className={`w-full px-4 py-4 rounded-xl bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] placeholder-[#B4B4B4] outline-none resize-none transition-all duration-200 focus:bg-white focus:border-[#EA580C] ${
                        errors.description ? "border-red-400" : "border-[#E5E7EB]"
                      }`}
                    />
                    {errors.description && <p className="text-[12px] text-red-500">{errors.description.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#374151]">
                      Bilder <span className="normal-case tracking-normal text-[#94A3B8]">— optional</span>
                    </label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border border-dashed border-[#E5E7EB] rounded-xl p-5 flex items-center justify-center gap-3 cursor-pointer hover:border-[#EA580C]/40 hover:bg-[#FFF7F0] transition-colors duration-200"
                    >
                      <ImagePlus size={15} strokeWidth={1.5} className="text-[#94A3B8]" />
                      <span className="text-[13px] text-[#94A3B8]">Klicken zum Hochladen</span>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                      const sel = Array.from(e.target.files || []);
                      setFiles((p) => [...p, ...sel].slice(0, 5));
                    }} />
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {files.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg px-3 py-1.5">
                            <span className="text-[11px] text-[#6B7280] max-w-[100px] truncate">{f.name}</span>
                            <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}>
                              <X size={10} className="text-[#94A3AF]" />
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
                  <p className="text-[13px] text-[#6B7280] mb-2">Bitte prüfen Sie Ihre Angaben.</p>
                  <div className="border-t border-[#F1F1F1]">
                    {[
                      { label: "E-Mail", value: v.email },
                      { label: "Name", value: v.name },
                      { label: "Telefon", value: v.phone },
                      { label: "Adresse", value: v.address },
                      { label: "Anliegen", value: v.description },
                    ].filter(r => r.value).map((row) => (
                      <div key={row.label} className="flex gap-6 py-4 border-b border-[#F1F1F1]">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8] w-16 shrink-0 mt-0.5">{row.label}</span>
                        <span className="text-[13px] text-[#0A0A0A] leading-relaxed">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  {files.length > 0 && (
                    <p className="text-[12px] text-[#94A3B8]">{files.length} Bild(er) beigefügt</p>
                  )}
                  <p className="text-[11px] text-[#94A3B8] mt-2">
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
                className={`text-[13px] text-[#94A3B8] hover:text-[#0A0A0A] transition-colors duration-200 ${step === 1 ? "invisible" : ""}`}
              >
                ← Zurück
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-[#EA580C] text-white text-[13px] font-medium px-7 py-3 rounded-full hover:bg-[#D6480A] transition-colors duration-200"
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
                  className="inline-flex items-center gap-2 bg-[#EA580C] text-white text-[13px] font-medium px-7 py-3 rounded-full hover:bg-[#D6480A] transition-colors duration-200 disabled:opacity-50"
                >
                  {submitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Wird gesendet...</>
                  ) : (
                    <>Anfrage absenden</>
                  )}
                </button>
              )}
            </div>
            {submitError && (
              <p className="text-[12px] text-red-500 mt-4">
                Senden hat nicht funktioniert. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.
              </p>
            )}
          </motion.div>
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
        <label className="text-[11px] uppercase tracking-[0.14em] font-medium text-[#374151]">{label}</label>
        {required && <span className="text-[10px] text-[#EA580C] uppercase tracking-wider">Pflichtfeld</span>}
        {hint && <span className="text-[10px] text-[#94A3B8]">{hint}</span>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...(registration as object)}
        className={`w-full px-4 py-4 rounded-xl bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] placeholder-[#B4B4B4] outline-none transition-all duration-200 focus:bg-white focus:border-[#EA580C] ${
          error ? "border-red-400" : "border-[#E5E7EB]"
        }`}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
