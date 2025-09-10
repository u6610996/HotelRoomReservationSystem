export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  price: number;          // ราคา/คืน
  discount?: number;      // 0..1
  checkIn: string;        // YYYY-MM-DD
  checkOut: string;       // YYYY-MM-DD
  nights: number;
  total: number;
  status: "pending" | "confirmed";
};

const KEY = "booking";

export const saveBooking = (b: Booking) =>
  localStorage.setItem(KEY, JSON.stringify(b));

export const loadBooking = (): Booking | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking) : null;
  } catch {
    return null;
  }
};

export const clearBooking = () => localStorage.removeItem(KEY);
