import logo from "../assets/logo.jpeg";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img src={logo} alt="FixNShine" className="h-10" />

        {/* Copyright */}
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} FixNShine. Všechna práva vyhrazena.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#sluzby"
            className="text-text-muted hover:text-gold text-sm transition-colors"
          >
            Služby
          </a>
          <a
            href="#rezervace"
            className="text-text-muted hover:text-gold text-sm transition-colors"
          >
            Rezervace
          </a>
          <a
            href="#kontakt"
            className="text-text-muted hover:text-gold text-sm transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
