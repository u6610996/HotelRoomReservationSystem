export function validateDates(checkIn?: string, checkOut?: string): string | null {
  if (!checkIn || !checkOut) return "Please select both dates";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) return "Invalid date format";
  if (checkOut <= checkIn) return "Invalid date range";
  return null;
}
