export function enumerateNights(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  const d = new Date(checkIn);
  const end = new Date(checkOut);
  while (d < end) { out.push(d.toISOString().slice(0,10)); d.setDate(d.getDate()+1); }
  return out; // [check-in, check-out)
}
