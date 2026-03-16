import emailjs from "@emailjs/browser";

// EmailJS konfigurace - nastaví se v .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || "";
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

interface BookingEmailData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  car: string;
  note: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  time: string;
}

// Pošle email MAJITELI (tobě) o nové rezervaci — obsahuje info o zákazníkovi
export async function sendOwnerNotification(data: BookingEmailData) {
  if (!SERVICE_ID || !OWNER_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS není nakonfigurován - email majiteli nebyl odeslán");
    return;
  }

  await emailjs.send(
    SERVICE_ID,
    OWNER_TEMPLATE_ID,
    {
      to_email: "jakub.richter@fixnshine.cz",
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      customer_email: data.customerEmail || "Neuvedeno",
      car: data.car || "Neuvedeno",
      note: data.note || "Bez poznámky",
      service_name: data.serviceName,
      service_price: data.servicePrice,
      date: data.date,
      time: data.time,
    },
    PUBLIC_KEY
  );
}

// Pošle email ZÁKAZNÍKOVI s potvrzením a adresou
export async function sendCustomerConfirmation(data: BookingEmailData) {
  if (!SERVICE_ID || !CUSTOMER_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS není nakonfigurován - email zákazníkovi nebyl odeslán");
    return;
  }

  if (!data.customerEmail) {
    console.warn("Zákazník neuvedl email - potvrzení nebylo odesláno");
    return;
  }

  await emailjs.send(
    SERVICE_ID,
    CUSTOMER_TEMPLATE_ID,
    {
      to_email: data.customerEmail,
      customer_name: data.customerName,
      service_name: data.serviceName,
      service_price: data.servicePrice,
      date: data.date,
      time: data.time,
      address: "Na Hřebenech I 673/19, Praha 4",
      phone: "+420 608 144 005",
    },
    PUBLIC_KEY
  );
}
