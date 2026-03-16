import { createClient } from "@supabase/supabase-js";

// Tyto hodnoty se nastaví v .env souboru
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
  id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  car: string;
  note: string;
  service_id: string;
  service_name: string;
  service_price: string;
  appointment_date: string;
  appointment_time: string;
  created_at?: string;
}

// Uložit novou rezervaci do databáze
export async function createBooking(booking: Booking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select();

  if (error) throw error;
  return data?.[0];
}

// Získat všechny obsazené sloty pro daný den
export async function getBookedSlots(date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("appointment_time")
    .eq("appointment_date", date);

  if (error) throw error;
  return (data || []).map((b) => b.appointment_time);
}
