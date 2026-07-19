"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const messages = [
  { side: "customer", avatar: "K", text: "Ich brauche jemanden, der mein Badezimmer renoviert.", delay: 0 },
  { side: "concivo", avatar: "C", text: "Kein Problem. Beschreiben Sie kurz den Zustand.", delay: 0.6 },
  { side: "customer", avatar: "K", text: "Fliesen kaputt, Wasserhahn tropft, Licht flackert.", delay: 1.2 },
  { side: "concivo", avatar: "C", text: "Verstanden. Wir haben die richtigen Fachleute für Sie.", delay: 1.8 },
  { side: "concivo", avatar: "C", text: "✓ Termin Donnerstag, 10:00 Uhr bestätigt.", delay: 2.4, highlight: true },
];

function Bubble({ msg, active }: { msg: typeof messages[0]; active: boolean }) {
  const isCustomer = msg.side === "customer";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: msg.delay }}
      className={`flex items-end gap-2 ${isCustomer ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
          isCustomer ? "bg-[#F1F1F1] text-[#6B7280]" : "bg-[#2D4A6B] text-white"
        }`}
      >
        {msg.avatar}
      </div>
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
          isCustomer
            ? "bg-[#F5F5F5] text-[#0D0D0D] rounded-bl-sm"
            : msg.highlight
            ? "bg-[#2D4A6B] text-white rounded-br-sm"
            : "bg-[#3D5A75] text-white rounded-br-sm"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

export default function ChatStory() {
  const chatRef = useRef(null);
  const chatInView = useInView(chatRef, { once: true, margin: "-100px" });
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div ref={titleRef}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-5"
            >
              So einfach
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-tight text-[#0A0A0A] mb-6"
            >
              Sie schreiben.{" "}
              <br />
              <span className="font-[family-name:var(--font-playfair)] italic text-[#2D4A6B]">
                Wir lösen.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[15px] text-[#6B7280] leading-relaxed mb-10 max-w-xs"
            >
              Kein Suchen. Kein Koordinieren. Einfach beschreiben — wir übernehmen.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {["Antwort innerhalb von 24 Stunden", "Ein Ansprechpartner — immer", "Keine versteckten Kosten"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D4A6B] shrink-0" />
                  <span className="text-[13px] text-[#6B7280]">{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Chat */}
          <div ref={chatRef}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={chatInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#F1F1F1] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2D4A6B] flex items-center justify-center text-white text-[11px] font-semibold">
                  C
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#0A0A0A]">Concivo</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-[#94A3B8]">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 flex flex-col gap-3.5">
                {messages.map((msg) => (
                  <Bubble key={msg.delay} msg={msg} active={chatInView} />
                ))}
              </div>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={chatInView ? { opacity: 1 } : {}}
                transition={{ delay: 3.2, duration: 0.4 }}
                className="px-5 py-4 border-t border-[#F1F1F1] flex items-center gap-3"
              >
                <div className="flex-1 bg-[#F5F5F5] rounded-full px-4 py-2.5 text-[12px] text-[#C4C4C4]">
                  Ihr Anliegen beschreiben...
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2D4A6B] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
