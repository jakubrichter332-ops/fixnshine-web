import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Služby", href: "#sluzby" },
  { label: "Galerie", href: "#galerie" },
  { label: "O nás", href: "#o-nas" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl sm:text-2xl font-bold tracking-tight">
          <span className="text-gold">FIX</span>
          <span className="text-text-primary">N</span>
          <span className="text-gold">SHINE</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-gold transition-colors duration-200 text-sm uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#rezervace"
            className="bg-gold hover:bg-gold-light text-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded"
          >
            Rezervovat
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-text-primary"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="text-text-secondary hover:text-gold transition-colors text-sm uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rezervace"
              onClick={() => setIsMobileOpen(false)}
              className="bg-gold hover:bg-gold-light text-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded"
            >
              Rezervovat
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
