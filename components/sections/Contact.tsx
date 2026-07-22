"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const contactItems = [
  { Icon: Phone, label: "Telefon", value: "+41 44 000 00 00", href: "tel:+41440000000" },
  { Icon: Mail, label: "E-Mail", value: "hallo@concivo.ch", href: "mailto:hallo@concivo.ch" },
  { Icon: MapPin, label: "Adresse", value: "Musterstrasse 1, 8001 Zürich", href: "https://maps.google.com" },
];

const hours = [
  { day: "Montag – Freitag", time: "08:00 – 18:00 Uhr", open: true },
  { day: "Samstag", time: "Geschlossen", open: false },
  { day: "Sonntag", time: "Geschlossen", open: false },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="kontakt" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-5"
            >
              Kontakt
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-[#0A0A0A] mb-5"
            >
              Sprechen wir{" "}
              <span className="font-[family-name:var(--font-playfair)] italic text-[#EA580C]">
                persönlich.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[15px] text-[#6B7280] leading-relaxed mb-12 max-w-xs"
            >
              Bevorzugen Sie den direkten Kontakt? Wir freuen uns auf Ihren Anruf.
            </motion.p>

            <div className="flex flex-col border-t border-[#E5E7EB]">
              {contactItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.07 }}
                  className="group flex items-center gap-4 py-5 border-b border-[#E5E7EB] hover:text-[#EA580C] transition-colors duration-200"
                >
                  <item.Icon size={16} strokeWidth={1.5} className="text-[#94A3B8] group-hover:text-[#EA580C] transition-colors shrink-0" />
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-[#94A3B8] mb-0.5">{item.label}</div>
                    <div className="text-[14px] text-[#0A0A0A] group-hover:text-[#EA580C] transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="bg-white rounded-2xl p-10 border border-[#F1F1F1] shadow-lg shadow-black/5">
              <h3 className="text-[14px] font-medium text-[#0A0A0A] mb-8 tracking-tight">Erreichbarkeit</h3>
              <div className="flex flex-col border-t border-[#F1F1F1]">
                {hours.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between py-4 border-b border-[#F1F1F1]"
                  >
                    <span className="text-[13px] text-[#6B7280]">{row.day}</span>
                    <span className={`text-[13px] font-medium ${row.open ? "text-[#0A0A0A]" : "text-[#C4C4C4]"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#F1F1F1]">
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#EA580C] mb-2">Anfragen jederzeit</div>
                <div className="text-[13px] text-[#6B7280] leading-relaxed">
                  Sie können uns rund um die Uhr über das Formular kontaktieren. Wir melden uns am nächsten Werktag.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
