import { useState, useEffect } from "react";
import { Lock, Loader2, Trash2, RefreshCw, LogOut, X, Download } from "lucide-react";
import { getAllBookings, deleteBooking, getMarketingEmails, type Booking } from "../lib/supabase";

const ADMIN_PASSWORD = "fixnshine2024";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error("Chyba při načítání rezervací:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const openCancelModal = (booking: Booking) => {
    setCancellingBooking(booking);
    setCancelReason("");
  };

  const closeCancelModal = () => {
    setCancellingBooking(null);
    setCancelReason("");
  };

  const handleConfirmCancel = async () => {
    if (!cancellingBooking?.id) return;

    setIsDeleting(true);
    try {
      await deleteBooking(cancellingBooking.id);

      // Otevřít předvyplněný email v mailovém klientu
      if (cancellingBooking.customer_email) {
        const date = new Date(cancellingBooking.appointment_date + "T00:00:00").toLocaleDateString("cs-CZ");
        const time = cancellingBooking.appointment_time;
        const reason = cancelReason || "Důvod nebyl uveden.";

        const subject = encodeURIComponent("FixNShine — Vaše rezervace byla zrušena");
        const body = encodeURIComponent(
          `Dobrý den ${cancellingBooking.customer_name},\n\n` +
          `bohužel Vám musíme oznámit, že Vaše rezervace u FixNShine byla zrušena.\n\n` +
          `Původní termín:\n` +
          `- Služba: ${cancellingBooking.service_name}\n` +
          `- Datum: ${date}\n` +
          `- Čas: ${time}\n\n` +
          `Důvod zrušení:\n${reason}\n\n` +
          `Omlouváme se za komplikace. Pokud si přejete, můžete si zarezervovat nový termín na našich stránkách nebo nás kontaktujte na +420 608 144 005.\n\n` +
          `S pozdravem,\nTým FixNShine`
        );

        const gmailUrl = `https://mail.google.com/mail/u/fns.fixnshine@gmail.com/?view=cm&to=${encodeURIComponent(cancellingBooking.customer_email)}&su=${subject}&body=${body}`;
        window.open(gmailUrl, "_blank");
      }

      setBookings((prev) => prev.filter((b) => b.id !== cancellingBooking.id));
      closeCancelModal();
    } catch (err) {
      console.error("Chyba při mazání rezervace:", err);
      alert("Nepodařilo se smazat rezervaci.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-surface border border-border rounded-xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center">
              <Lock size={24} className="text-gold" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-text-primary text-center mb-6">
            Admin panel
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            placeholder="Zadejte heslo"
            className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors mb-3"
            autoFocus
          />
          {passwordError && (
            <p className="text-red-400 text-sm mb-3">Nesprávné heslo.</p>
          )}
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-light text-primary py-3 text-sm font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg"
          >
            Přihlásit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text-primary">
            Správa rezervací
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={async () => {
                try {
                  const emails = await getMarketingEmails();
                  if (emails.length === 0) {
                    alert("Žádní zákazníci se souhlasem s marketingem.");
                    return;
                  }
                  const csv = "Jméno,Email\n" + emails.map((e) => `"${e.customer_name}","${e.customer_email}"`).join("\n");
                  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "marketing-emaily.csv";
                  link.click();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error("Chyba při exportu:", err);
                  alert("Nepodařilo se exportovat emaily.");
                }
              }}
              className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg px-4 py-2 text-sm text-gold hover:bg-gold/20 transition-colors"
            >
              <Download size={16} />
              Exportovat emaily
            </button>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-gold/30 transition-colors"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Obnovit
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-gold/30 transition-colors"
            >
              <LogOut size={16} />
              Odhlásit
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-surface border border-border rounded-xl p-4 mb-6">
          <p className="text-text-secondary text-sm">
            Celkem budoucích rezervací:{" "}
            <span className="text-gold font-semibold">{bookings.length}</span>
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={32} className="animate-spin text-gold" />
          </div>
        )}

        {/* Empty state */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">Žádné budoucí rezervace.</p>
          </div>
        )}

        {/* Table */}
        {!loading && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-text-muted font-medium">Datum</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Čas</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Služba</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Jméno</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Telefon</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Email</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Auto</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Poznámka</th>
                  <th className="px-4 py-3 text-text-muted font-medium">Akce</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-text-primary whitespace-nowrap">
                      {new Date(booking.appointment_date + "T00:00:00").toLocaleDateString("cs-CZ")}
                    </td>
                    <td className="px-4 py-3 text-gold font-medium">
                      {booking.appointment_time}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {booking.service_name}
                    </td>
                    <td className="px-4 py-3 text-text-primary font-medium">
                      {booking.customer_name}
                    </td>
                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                      {booking.customer_phone}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {booking.customer_email || "—"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {booking.car || "—"}
                    </td>
                    <td className="px-4 py-3 text-text-muted max-w-[200px] truncate">
                      {booking.note || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openCancelModal(booking)}
                        className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors text-sm"
                      >
                        <Trash2 size={14} />
                        Zrušit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel modal */}
      {cancellingBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Zrušit rezervaci
              </h2>
              <button
                onClick={closeCancelModal}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-primary/50 border border-border rounded-lg p-3 mb-4 text-sm">
              <p className="text-text-primary font-medium">
                {cancellingBooking.customer_name}
              </p>
              <p className="text-text-secondary">
                {new Date(cancellingBooking.appointment_date + "T00:00:00").toLocaleDateString("cs-CZ")}{" "}
                v {cancellingBooking.appointment_time} — {cancellingBooking.service_name}
              </p>
              {!cancellingBooking.customer_email && (
                <p className="text-yellow-400 text-xs mt-1">
                  Zákazník neuvedl email — oznámení nebude odesláno.
                </p>
              )}
            </div>

            <label className="block text-text-primary text-sm font-medium mb-2">
              Důvod zrušení
            </label>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={3}
              className="w-full bg-primary/50 border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-gold focus:outline-none transition-colors resize-none mb-4"
              placeholder="Např. technické důvody, nemoc, změna provozní doby..."
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={closeCancelModal}
                className="flex-1 bg-primary/50 border border-border rounded-lg py-2.5 text-sm text-text-secondary hover:text-text-primary hover:border-gold/30 transition-colors"
              >
                Zpět
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isDeleting}
                className="flex-1 bg-red-500/20 border border-red-500/30 rounded-lg py-2.5 text-sm text-red-400 hover:bg-red-500/30 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Ruším...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Zrušit rezervaci
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
