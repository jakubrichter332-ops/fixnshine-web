import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { Calendar, Clock, User, Phone, Mail, Car, Check } from "lucide-react";
import "react-day-picker/style.css";

const services = [
  { id: "1", name: "Kompletní čištění exteriéru", price: "890 Kč" },
  { id: "2", name: "Základní čištění interiéru", price: "1 290 Kč" },
  { id: "3", name: "Interiér + Exteriér", price: "1 790 Kč" },
  { id: "4", name: "Tepování interiéru", price: "1 990 Kč" },
  { id: "5", name: "Kompletní detailing", price: "2 490 Kč" },
  { id: "6", name: "Individuální tepování", price: "Dle domluvy" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00",
];

function generateICS(
  date: Date,
  time: string,
  service: string,
  name: string
): string {
  const [hours, minutes] = time.split(":").map(Number);
  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start);
  end.setHours(start.getHours() + 1);

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FixNShine//Booking//CS",
    "BEGIN:VEVENT",
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `SUMMARY:FixNShine - ${service}`,
    `DESCRIPTION:Rezervace pro ${name}\\nSlužba: ${service}`,
    "LOCATION:FixNShine",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Zítra máte termín u FixNShine!",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Za 2 hodiny máte termín u FixNShine!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    note: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService) return;

    const service = services.find((s) => s.id === selectedService);
    const icsContent = generateICS(
      selectedDate,
      selectedTime,
      service?.name || "",
      formData.name
    );

    // Download .ics file for Apple Calendar
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fixnshine-rezervace-${selectedDate.toISOString().split("T")[0]}.ics`;
    link.click();
    URL.revokeObjectURL(url);

    setIsSubmitted(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isSubmitted) {
    return (
      <section id="rezervace" className="py-24 px-6 bg-surface">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-gold" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Rezervace odeslána!</h2>
          <p className="text-text-secondary mb-4">
            Děkujeme, {formData.name}! Vaše rezervace na{" "}
            <strong className="text-gold">
              {selectedDate?.toLocaleDateString("cs-CZ")} v {selectedTime}
            </strong>{" "}
            byla zaznamenána.
          </p>
          <p className="text-text-secondary mb-8">
            Soubor pro Apple Kalendář (.ics) byl stažen — otevřete ho pro
            přidání připomínky do kalendáře. Ozveme se vám pro potvrzení.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedDate(undefined);
              setSelectedTime("");
              setSelectedService("");
              setFormData({ name: "", phone: "", email: "", car: "", note: "" });
            }}
            className="bg-gold hover:bg-gold-light text-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded"
          >
            Nová rezervace
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rezervace" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Rezervace
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Zarezervujte si{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              termín
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Vyberte si službu, datum a čas. Po odeslání obdržíte soubor pro
            přidání do Apple Kalendáře s automatickými připomínkami.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left - Calendar & Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Service selection */}
              <div>
                <label className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <Car size={18} className="text-gold" />
                  Vyberte službu
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                        selectedService === service.id
                          ? "border-gold bg-gold/10 text-text-primary"
                          : "border-border bg-primary/50 text-text-secondary hover:border-gold/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={selectedService === service.id}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedService === service.id
                              ? "border-gold"
                              : "border-text-muted"
                          }`}
                        >
                          {selectedService === service.id && (
                            <div className="w-2 h-2 rounded-full bg-gold" />
                          )}
                        </div>
                        <span className="text-sm">{service.name}</span>
                      </div>
                      <span className="text-gold text-sm font-semibold">
                        {service.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date picker */}
              <div>
                <label className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <Calendar size={18} className="text-gold" />
                  Vyberte datum
                </label>
                <div className="bg-primary/50 border border-border rounded-xl p-4 inline-block [&_.rdp-root]:text-text-primary [&_.rdp-day]:text-text-secondary [&_.rdp-selected_.rdp-day]:bg-gold [&_.rdp-selected_.rdp-day]:text-primary [&_.rdp-today:not(.rdp-selected)_.rdp-day]:text-gold [&_.rdp-chevron]:fill-gold [&_.rdp-disabled_.rdp-day]:text-text-muted/30">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{ before: today }}
                    weekStartsOn={1}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Time & Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Time selection */}
              <div>
                <label className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <Clock size={18} className="text-gold" />
                  Vyberte čas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        selectedTime === time
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-primary/50 text-text-secondary hover:border-gold/30"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2">
                    <User size={18} className="text-gold" />
                    Jméno a příjmení
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2">
                    <Phone size={18} className="text-gold" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="+420 123 456 789"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2">
                    <Mail size={18} className="text-gold" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="jan@email.cz"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2">
                    <Car size={18} className="text-gold" />
                    Značka a model vozu
                  </label>
                  <input
                    type="text"
                    value={formData.car}
                    onChange={(e) =>
                      setFormData({ ...formData, car: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="BMW 3 Series"
                  />
                </div>

                <div>
                  <label className="text-text-primary font-medium mb-2 block">
                    Poznámka (volitelné)
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Speciální požadavky..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || !selectedService}
                className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/30 disabled:cursor-not-allowed text-primary py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg"
              >
                Odeslat rezervaci
              </button>

              <p className="text-text-muted text-xs text-center">
                Po odeslání obdržíte .ics soubor pro přidání do Apple Kalendáře
                s připomínkami 1 den a 2 hodiny před termínem.
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  );
}
