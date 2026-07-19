"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Anliegen beschreiben", description: "Einfach in eigenen Worten — kein Fachwissen nötig.", tag: null },
  { number: "02", title: "Wir melden uns", description: "Persönlicher Kontakt innerhalb von 24 Stunden.", tag: "Kostenlos" },
  { number: "03", title: "Wir suchen den Partner", description: "Wir organisieren alles und finden die passende Lösung.", tag: "Kostenlos" },
  { number: "04", title: "Unverbindliche Offerte", description: "Sie erhalten eine transparente Offerte — keine Verpflichtung.", tag: "Kostenlos" },
  { number: "05", title: "Sie entscheiden", description: "Ja oder Nein — Sie haben das letzte Wort. Immer.", tag: null },
];

export default function HowItWorks() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="ablauf" className="py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.25em] text-[#4B5563] mb-5"
          >
            Ablauf
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-white"
          >
            Einfach.{" "}
            <span className="font-[family-name:var(--font-playfair)] italic text-[#4A7FA5]">
              Persönlich.
            </span>
          </motion.h2>
        </div>

        <div className="border-t border-white/8">
          {steps.map((step, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            return (
              <motion.div
                key={step.number}
                ref={ref}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex items-start gap-8 py-8 border-b border-white/8"
              >
                <span className="text-[11px] font-medium text-[#374151] tracking-widest w-8 shrink-0 mt-0.5">
                  {step.number}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-[16px] font-medium text-white tracking-tight">{step.title}</h3>
                    {step.tag && (
                      <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#4A7FA5] border border-[#2D4A6B]/40 px-2.5 py-1 rounded-full">
                        {step.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-[#4B5563] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-[14px] text-[#4B5563] max-w-sm">
            Bis wir den passenden Partner gefunden und eine Offerte erstellt haben, ist es für Sie kostenlos. Danach schauen Sie sich die Offerte in Ruhe an und entscheiden, ob Sie sie annehmen möchten.
          </p>
          <a
            href="#anfrage"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#0A0A0A] text-[13px] font-medium px-6 py-3 rounded-full hover:bg-[#F5F5F5] transition-colors duration-200"
          >
            Jetzt anfragen
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
