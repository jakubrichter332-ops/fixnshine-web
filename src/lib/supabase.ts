import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nksmxglddwruqbppljeu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rc214Z2xkZHdydXFicHBsamV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzA3MDQsImV4cCI6MjA4OTI0NjcwNH0.nt-skr6zOXUQPToVLL_YV1TxyjC03E5kanEwyr58FrI";

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

// Získat všechny budoucí rezervace (pro admin panel)
export async function getAllBookings(): Promise<Booking[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("appointment_date", today)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) throw error;
  return data || [];
}

// Smazat rezervaci podle ID
export async function deleteBooking(id: string) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}
