import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_j8a25xa";
const OWNER_TEMPLATE_ID = "template_wzl67e5";
const CUSTOMER_TEMPLATE_ID = "template_3d4bks5";
const PUBLIC_KEY = "xzws2Uf1NV-_9gmub";

export interface BookingEmailData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  car: string;
  note: string;
  serviceName: string;
  servicePrice: string;
  date: string;
  time: string;
  icsData: string; // Base64 encoded .ics obsah pro kalendář
}

// Pošle email MAJITELI (tobě) o nové rezervaci — obsahuje info o zákazníkovi + .ics pro kalendář
export async function sendOwnerNotification(data: BookingEmailData) {
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
      ics_data: data.icsData,
    },
    PUBLIC_KEY
  );
}

// Pošle email ZÁKAZNÍKOVI s potvrzením a adresou
export async function sendCustomerConfirmation(data: BookingEmailData) {
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
      ics_data: data.icsData,
    },
    PUBLIC_KEY
  );
}
