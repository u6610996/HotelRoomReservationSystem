import data from "../data/rooms.json";
import { enumerateNights } from "./enumerateNights";

export type Room = {
  id: string; name: string; type: "Single"|"Double"|"Suite";
  price: number; popularity: number; quantity: number;
  discount?: number; features: string[]; images: string[];
  availableNights: string[];
};

export type Filters = {
  checkIn?: string; checkOut?: string;
  type?: "Single"|"Double"|"Suite"|"ALL";
  priceMin?: number; priceMax?: number;
  features?: string[];
  discountedOnly?: boolean;
  sortBy?: "price"|"popularity";
};

export function filterRooms(f: Filters): Room[] {
  const rooms = data as Room[];
  const nights = f.checkIn && f.checkOut ? enumerateNights(f.checkIn, f.checkOut) : [];

  let out = rooms.filter(r => {
    const typeOk = !f.type || f.type==="ALL" ? true : r.type===f.type;
    const priceOk = (f.priceMin ?? -Infinity) <= r.price && r.price <= (f.priceMax ?? Infinity);
    const featuresOk = !f.features?.length || f.features.every(x => r.features.includes(x));
    const discountOk = !f.discountedOnly || (r.discount ?? 0) > 0;
    const qtyOk = r.quantity >= 0;
    const availOk = !nights.length || nights.every(n => r.availableNights.includes(n));
    return typeOk && priceOk && featuresOk && discountOk && qtyOk && availOk;
  });

  if (f.sortBy === "price") out.sort((a,b)=> a.price - b.price || a.id.localeCompare(b.id));
  if (f.sortBy === "popularity") out.sort((a,b)=> b.popularity - a.popularity || a.id.localeCompare(b.id));
  return out;
}
