import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone size={22} />,
    label: "Telefon",
    value: "+420 608 144 005",
    href: "tel:+420608144005",
  },
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: "Bude doplněn",
    href: undefined,
  },
  {
    icon: <MapPin size={22} />,
    label: "Lokalita",
    value: "Bude doplněno",
    href: undefined,
  },
  {
    icon: <Clock size={22} />,
    label: "Otevírací doba",
    value: "Po–Pá: 8:00–17:00",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Spojte se{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              s námi
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Máte dotaz nebo si chcete domluvit termín? Neváhejte nás kontaktovat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-xl p-6 text-center hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold group-hover:bg-gold/20 transition-colors">
                {info.icon}
              </div>
              <h3 className="text-text-muted text-xs uppercase tracking-widest mb-2">
                {info.label}
              </h3>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-text-primary hover:text-gold transition-colors font-medium"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-text-primary font-medium">{info.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mt-12"
        >
          <a
            href="https://instagram.com/fns_fixnshine"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-200"
          >
            <Instagram size={20} />
          </a>
          <a
            href="tel:+420608144005"
            className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-200"
          >
            <Phone size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
