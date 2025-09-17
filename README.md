## 🏨 Hotel Room Reservation System
---
## 👥 Team
- Thanadon R. (6610308)
- Kitirat P. (6610387)
- Thananya A.(6610609)
- Worachai A. (6610996)

> CSX4104 – Software Testing • Web app for searching, filtering, and mock-booking hotel rooms.  
> **Live demo:** `https://u6610996.github.io/HotelRoomReservationSystem/`

---

## ✨ What’s in this project

- **Fast Search & Filter**: by **room type**, **price range**, **features** (Wi-Fi, Balcony, Sea View), and **date availability** (must be available on all selected nights).
- **Date validation**: checks invalid ranges (e.g., end ≤ start) with clear error messages.
- **Sorting**: by **price** (asc) or **popularity** (desc).
- **Room detail page**: large hero image, gallery, features, price/discount, CTA.
- **Booking flow (mock)**: Room → **Checkout** (nights + total) → **Payment** (fake PromptPay QR) → **Confirmation** (booking ref).
- **State persistence**: booking stored in `localStorage` (refresh-safe) and can be cancelled.
- **Production-friendly routing**: **HashRouter** + Vite `BASE_URL` helper so GitHub Pages works reliably.
- **Clean desktop UI**: Tailwind v4, simple image-frame utilities (aspect ratio, radius, hover zoom).

---

## 🧠 Scope we built

- Core logic for **filtering rooms** (type/price/features/availability) and **validating dates**.
- UI/UX for results, empty/error states, and a complete mock booking path.
- Minimal **payment confirmation step** (no real gateway; QR image only).
- Deployment via **GitHub Pages** (Actions workflow).

---

## 🧩 Tech Stack

- **React + Vite + TypeScript**
- **React Router** (HashRouter)
- **Tailwind CSS v4** (with `@tailwindcss/postcss`)
- **LocalStorage** for persistence

---


