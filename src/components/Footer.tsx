export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-lg font-bold tracking-tight">
          <span className="text-gold">FIX</span>
          <span className="text-text-primary">N</span>
          <span className="text-gold">SHINE</span>
        </div>

        {/* Copyright */}
        <p className="text-text-muted text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} FixNShine. Všechna práva vyhrazena.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#sluzby"
            className="text-text-muted hover:text-gold text-xs sm:text-sm transition-colors"
          >
            Služby
          </a>
          <a
            href="#rezervace"
            className="text-text-muted hover:text-gold text-xs sm:text-sm transition-colors"
          >
            Rezervace
          </a>
          <a
            href="#kontakt"
            className="text-text-muted hover:text-gold text-xs sm:text-sm transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
