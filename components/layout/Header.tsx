"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const navItems = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#ueber-uns" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[#F1F1F1]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-[#EA580C] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">C</span>
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#0A0A0A]">Concivo</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#anfrage"
            className="text-[13px] font-medium bg-[#0A0A0A] text-white px-5 py-2 rounded-full hover:bg-[#EA580C] transition-colors duration-300"
          >
            Anfrage stellen
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menü öffnen"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-5 h-px bg-[#0A0A0A] block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-px bg-[#0A0A0A] block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-5 h-px bg-[#0A0A0A] block"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-b border-[#F1F1F1]"
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-[#0A0A0A] py-2 border-b border-[#F5F5F5]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#anfrage"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-[14px] font-medium bg-[#0A0A0A] text-white px-4 py-3 rounded-full text-center"
          >
            Anfrage stellen
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}
