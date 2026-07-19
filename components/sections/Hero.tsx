"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-10"
        >
          Persönlicher Hausmanager
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(3rem,8vw,6rem)] font-light leading-[1.0] tracking-tight text-[#0A0A0A] mb-8"
        >
          Ihr Zuhause.
          <br />
          <span className="font-[family-name:var(--font-playfair)] italic text-[#2D4A6B]">
            Unsere Aufgabe.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[17px] text-[#6B7280] mb-14 max-w-sm mx-auto leading-relaxed"
        >
          Beschreiben Sie Ihr Anliegen.{" "}
          <span className="text-[#0A0A0A]">Wir kümmern uns um den Rest.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#anfrage"
            className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white text-[14px] font-medium px-8 py-3.5 rounded-full hover:bg-[#2D4A6B] transition-colors duration-300"
          >
            Anfrage stellen
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#ablauf"
            className="text-[14px] text-[#94A3B8] hover:text-[#0A0A0A] transition-colors duration-200"
          >
            So funktioniert es ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
