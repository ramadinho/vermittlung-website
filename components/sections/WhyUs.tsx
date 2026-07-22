"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const reasons = [
  { title: "Ein Ansprechpartner", description: "Sie kommunizieren immer mit derselben Person — von der ersten Anfrage bis zur fertigen Lösung." },
  { title: "Wir suchen den richtigen Partner", description: "Wir übernehmen die Suche, Auswahl und Koordination — Sie müssen sich um nichts kümmern." },
  { title: "Unverbindliche Offerte zuerst", description: "Bis wir den passenden Partner gefunden und eine Offerte erstellt haben, ist es für Sie komplett kostenlos." },
  { title: "Sie entscheiden", description: "Schauen Sie sich die Offerte in Ruhe an und geben Sie uns Bescheid, ob Sie sie annehmen möchten oder nicht — ganz ohne Druck." },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ueber-uns" className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-5"
            >
              Über uns
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-[#0A0A0A] mb-16"
            >
              Persönlich.{" "}
              <span className="font-[family-name:var(--font-playfair)] italic text-[#EA580C]">
                Verlässlich.
              </span>
            </motion.h2>

            <div className="flex flex-col border-t border-[#F1F1F1]">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.07 }}
                  className="py-6 border-b border-[#F1F1F1]"
                >
                  <h3 className="text-[14px] font-medium text-[#0A0A0A] mb-1.5">{reason.title}</h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-[#FAFAFA] rounded-2xl p-10 border border-[#E5E7EB]">
              <div className="text-[4rem] leading-none text-[#E5E7EB] font-[family-name:var(--font-playfair)] mb-4">
                "
              </div>
              <blockquote className="text-[1.1rem] font-light text-[#0A0A0A] leading-relaxed tracking-tight mb-8">
                Ich musste mich um nichts kümmern. Ein Anruf — und alles war geregelt.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EA580C] flex items-center justify-center text-[12px] font-medium text-white">
                  M
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#0A0A0A]">Michael R.</div>
                  <div className="text-[11px] text-[#94A3B8]">Eigentümer, Zürich</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
