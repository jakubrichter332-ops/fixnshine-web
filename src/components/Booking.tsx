import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Car,
  Check,
  Loader2,
} from "lucide-react";
import "react-day-picker/style.css";
import { createBooking, getBookedSlots } from "../lib/supabase";
import { sendOwnerNotification, sendCustomerConfirmation } from "../lib/email";

const services = [
  { id: "1", name: "Kompletní čištění exteriéru", price: "890 Kč" },
  { id: "2", name: "Základní čištění interiéru", price: "1 290 Kč" },
  { id: "3", name: "Interiér + Exteriér", price: "1 790 Kč" },
  { id: "4", name: "Tepování interiéru", price: "1 990 Kč" },
  { id: "5", name: "Kompletní detailing", price: "2 490 Kč" },
  { id: "6", name: "Individuální tepování", price: "Dle domluvy" },
];

const ALL_TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
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
    "LOCATION:Na Hřebenech I 673/19, Praha 4",
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

function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    car: "",
    note: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Když uživatel vybere datum, načti obsazené sloty z databáze
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    setLoadingSlots(true);
    setSelectedTime(""); // Reset vybraného času

    getBookedSlots(dateStr)
      .then((slots) => setBookedSlots(slots))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService) return;

    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    setIsSubmitting(true);

    try {
      const dateStr = selectedDate.toISOString().split("T")[0];

      // 1. Ulož rezervaci do Supabase databáze
      await createBooking({
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        car: formData.car,
        note: formData.note,
        service_id: service.id,
        service_name: service.name,
        service_price: service.price,
        appointment_date: dateStr,
        appointment_time: selectedTime,
      });

      // 2. Generuj .ics pro kalendář
      const icsContent = generateICS(
        selectedDate,
        selectedTime,
        service.name,
        formData.name
      );
      const icsBase64 = btoa(unescape(encodeURIComponent(icsContent)));

      const emailData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        car: formData.car,
        note: formData.note,
        serviceName: service.name,
        servicePrice: service.price,
        date: selectedDate.toLocaleDateString("cs-CZ"),
        time: selectedTime,
        icsData: icsBase64,
      };

      // 3. Pošli email TOBĚ (majiteli) s info o zákazníkovi + .ics pro kalendář
      await sendOwnerNotification(emailData).catch(() => {
        console.warn("Email majiteli se nepodařilo odeslat");
      });

      // 4. Pošli potvrzovací email ZÁKAZNÍKOVI s adresou
      await sendCustomerConfirmation(emailData).catch(() => {
        console.warn("Email zákazníkovi se nepodařilo odeslat");
      });

      // 5. Stáhni .ics soubor pro zákazníka
      downloadICS(icsContent, `fixnshine-rezervace-${dateStr}.ics`);

      setIsSubmitted(true);
    } catch (err) {
      console.error("Chyba při ukládání rezervace:", err);
      alert(
        "Omlouváme se, při odesílání rezervace došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte telefonicky."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Neděle (0) a sobotu (6) zakážeme
  const disabledDays = [{ before: today }, { dayOfWeek: [0] }];

  if (isSubmitted) {
    return (
      <section
        id="rezervace"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Rezervace odeslána!
          </h2>
          <p className="text-text-secondary mb-4 text-sm sm:text-base">
            Děkujeme, {formData.name}! Vaše rezervace na{" "}
            <strong className="text-gold">
              {selectedDate?.toLocaleDateString("cs-CZ")} v {selectedTime}
            </strong>{" "}
            byla zaznamenána.
          </p>
          <p className="text-text-secondary mb-8 text-sm sm:text-base">
            Soubor pro Kalendář (.ics) byl stažen — otevřete ho pro přidání
            připomínky. Ozveme se vám pro potvrzení.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setSelectedDate(undefined);
              setSelectedTime("");
              setSelectedService("");
              setBookedSlots([]);
              setFormData({
                name: "",
                phone: "",
                email: "",
                car: "",
                note: "",
              });
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
    <section
      id="rezervace"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-surface"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest font-medium">
            Rezervace
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Zarezervujte si{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
              termín
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Vyberte si službu, datum a čas. Po odeslání vám i nám přijde
            potvrzení a termín se zobrazí jako obsazený.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left - Service & Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
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
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
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
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selectedService === service.id
                              ? "border-gold"
                              : "border-text-muted"
                          }`}
                        >
                          {selectedService === service.id && (
                            <div className="w-2 h-2 rounded-full bg-gold" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-gold text-xs sm:text-sm font-semibold ml-2 whitespace-nowrap">
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
                <div className="bg-primary/50 border border-border rounded-xl p-3 sm:p-4 inline-block w-full sm:w-auto [&_.rdp-root]:text-text-primary [&_.rdp-root]:w-full [&_.rdp-day]:text-text-secondary [&_.rdp-selected_.rdp-day]:bg-gold [&_.rdp-selected_.rdp-day]:text-primary [&_.rdp-today:not(.rdp-selected)_.rdp-day]:text-gold [&_.rdp-chevron]:fill-gold [&_.rdp-disabled_.rdp-day]:text-text-muted/30">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
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
              className="space-y-6 sm:space-y-8"
            >
              {/* Time selection */}
              <div>
                <label className="flex items-center gap-2 text-text-primary font-medium mb-3">
                  <Clock size={18} className="text-gold" />
                  Vyberte čas
                  {loadingSlots && (
                    <Loader2 size={14} className="animate-spin text-gold ml-1" />
                  )}
                </label>

                {!selectedDate ? (
                  <p className="text-text-muted text-sm py-4">
                    Nejdříve vyberte datum pro zobrazení dostupných časů.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {ALL_TIME_SLOTS.map((time) => {
                      const isBooked = bookedSlots.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            isBooked
                              ? "border-border/50 bg-primary/20 text-text-muted/40 cursor-not-allowed line-through"
                              : selectedTime === time
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border bg-primary/50 text-text-secondary hover:border-gold/30"
                          }`}
                        >
                          {time}
                          {isBooked && (
                            <span className="block text-[10px] no-underline leading-tight">
                              obsazeno
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Contact form */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2 text-sm">
                    <User size={16} className="text-gold" />
                    Jméno a příjmení *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="Jan Novák"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2 text-sm">
                    <Phone size={16} className="text-gold" />
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="+420 123 456 789"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2 text-sm">
                    <Mail size={16} className="text-gold" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="jan@email.cz"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-text-primary font-medium mb-2 text-sm">
                    <Car size={16} className="text-gold" />
                    Značka a model vozu
                  </label>
                  <input
                    type="text"
                    value={formData.car}
                    onChange={(e) =>
                      setFormData({ ...formData, car: e.target.value })
                    }
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors"
                    placeholder="BMW 3 Series"
                  />
                </div>

                <div>
                  <label className="text-text-primary font-medium mb-2 block text-sm">
                    Poznámka (volitelné)
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Speciální požadavky..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  !selectedDate ||
                  !selectedTime ||
                  !selectedService ||
                  isSubmitting
                }
                className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/30 disabled:cursor-not-allowed text-primary py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  "Odeslat rezervaci"
                )}
              </button>

              <p className="text-text-muted text-xs text-center">
                Po odeslání vám stáhneme .ics soubor pro kalendář a majitel
                obdrží email s potvrzením.
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  );
}
