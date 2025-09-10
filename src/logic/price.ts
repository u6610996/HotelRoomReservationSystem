export const nightsCount = (checkIn: string, checkOut: string) =>
  Math.max(0, Math.ceil((+new Date(checkOut) - +new Date(checkIn)) / 86400000));

export const totalPrice = (pricePerNight: number, nights: number, discount = 0) =>
  Math.round(pricePerNight * nights * (1 - discount));
