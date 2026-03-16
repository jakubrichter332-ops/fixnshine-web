import { motion } from "framer-motion";
import { Shield, Award, Heart, Clock } from "lucide-react";

const features = [
  {
    icon: <Shield size={24} />,
    title: "Prémiová kosmetika",
    description: "Používáme výhradně profesionální autokosmetiku nejvyšší kvality.",
  },
  {
    icon: <Award size={24} />,
    title: "Precizní práce",
    description: "Každý detail se počítá. Neuspokojíme se s ničím menším než dokonalostí.",
  },
  {
    icon: <Heart size={24} />,
    title: "Péče s láskou",
    description: "K vašemu vozu přistupujeme jako ke svému vlastnímu.",
  },
  {
    icon: <Clock size={24} />,
    title: "Flexibilní termíny",
    description: "Přizpůsobíme se vašemu času. Online rezervace 24/7.",
  },
];

export default function About() {
  return (
    <section id="o-nas" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm uppercase tracking-widest font-medium">
              O nás
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              Proč{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                FixNShine
              </span>
              ?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              FixNShine není jen obyčejná myčka. Jsme tým nadšenců, kteří věří,
              že péče o auto by měla být zážitek. Každý vůz, který k nám přijede,
              dostane individuální pozornost a profesionální péči od začátku
              do konce.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Specializujeme se na ruční mytí a detailing, protože jen lidská
              ruka dokáže odhalit a ošetřit každý detail. Žádné automaty, žádné
              kompromisy — pouze precizní ruční práce a prémiové přípravky.
            </p>

            <a
              href="#rezervace"
              className="inline-block bg-gold hover:bg-gold-light text-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded"
            >
              Objednat se
            </a>
          </motion.div>

          {/* Right side - features grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface border border-border rounded-xl p-4 sm:p-6 hover:border-gold/30 transition-all duration-300"
              >
                <div className="text-gold mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-text-primary font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
