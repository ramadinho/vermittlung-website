"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Hammer, Wrench, Leaf, Building2, Sparkles, ShieldAlert } from "lucide-react";

const services = [
  { Icon: Hammer, title: "Renovierung & Umbau", description: "Vom Bad bis zur Komplettsanierung — wir koordinieren jeden Schritt." },
  { Icon: Wrench, title: "Reparaturen & Wartung", description: "Defekte Heizung, tropfender Hahn — schnell und zuverlässig." },
  { Icon: Leaf, title: "Garten & Aussenanlagen", description: "Pflege und Gestaltung Ihrer Aussenanlagen das ganze Jahr." },
  { Icon: Building2, title: "Immobilienbetreuung", description: "Rundum-Betreuung für Eigentümer, Vermieter und Verwaltungen." },
  { Icon: Sparkles, title: "Inneneinrichtung", description: "Von der Idee bis zum fertigen Raum — wir planen und realisieren." },
  { Icon: ShieldAlert, title: "Notfalldienst", description: "Ausgesperrt, Wasserrohrbruch — wir sind erreichbar wenn es zählt." },
];

export default function Services() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="leistungen" className="py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-5"
          >
            Leistungen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-[#0A0A0A]"
          >
            Alles rund um{" "}
            <span className="font-[family-name:var(--font-playfair)] italic text-[#2D4A6B]">
              Ihre Immobilie
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F1F1F1]">
          {services.map((service, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });
            const { Icon } = service;
            return (
              <motion.div
                key={service.title}
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-8 group hover:bg-[#FAFAFA] transition-colors duration-300"
              >
                <Icon size={20} strokeWidth={1.5} className="text-[#2D4A6B] mb-5" />
                <h3 className="text-[15px] font-medium text-[#0A0A0A] mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
