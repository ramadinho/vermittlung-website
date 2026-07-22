"use client";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md bg-[#EA580C] flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">C</span>
              </span>
              <span className="text-[14px] font-semibold tracking-tight text-[#0A0A0A]">Concivo</span>
            </div>
            <p className="text-[13px] text-[#94A3B8] max-w-xs leading-relaxed">
              Ihr persönlicher Hausmanager. Ein Ansprechpartner für alles rund um Ihre Immobilie.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <nav className="flex flex-col gap-2">
              {[
                { label: "Leistungen", href: "#leistungen" },
                { label: "Ablauf", href: "#ablauf" },
                { label: "Über uns", href: "#ueber-uns" },
                { label: "Kontakt", href: "#kontakt" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <a href="tel:+41440000000" className="text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200">
                +41 44 000 00 00
              </a>
              <a href="mailto:hallo@concivo.ch" className="text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-200">
                hallo@concivo.ch
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#F1F1F1] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#C4C4C4]">© {currentYear} Concivo. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            {["Datenschutz", "Impressum", "AGB"].map((l) => (
              <a key={l} href="#" className="text-[12px] text-[#C4C4C4] hover:text-[#6B7280] transition-colors duration-200">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
