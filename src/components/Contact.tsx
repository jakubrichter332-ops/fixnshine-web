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
    value: "jakub.richter@fixnshine.cz",
    href: "mailto:jakub.richter@fixnshine.cz",
  },
  {
    icon: <MapPin size={22} />,
    label: "Adresa",
    value: "Na Hřebenech I 673/19, Praha 4",
    href: "https://maps.google.com/?q=Na+Hřebenech+I+673/19+Praha+4",
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
    <section id="kontakt" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Kontakt
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Spojte se{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              s námi
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Máte dotaz nebo si chcete domluvit termín? Neváhejte nás kontaktovat.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border border-border rounded-xl p-5 sm:p-6 text-center hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-gold group-hover:bg-gold/20 transition-colors">
                {info.icon}
              </div>
              <h3 className="text-text-muted text-xs uppercase tracking-widest mb-2">
                {info.label}
              </h3>
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-text-primary hover:text-gold transition-colors font-medium text-sm sm:text-base break-words"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-text-primary font-medium text-sm sm:text-base">
                  {info.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 rounded-xl overflow-hidden border border-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.5!2d14.4241!3d50.0461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNa+H%C5%99ebenech+I+673%2F19%2C+Praha+4!5e0!3m2!1scs!2scz!4v1"
            width="100%"
            height="300"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="FixNShine lokace"
          />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mt-10 sm:mt-12"
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
          <a
            href="mailto:jakub.richter@fixnshine.cz"
            className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-200"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
