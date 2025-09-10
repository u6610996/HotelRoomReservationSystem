import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/rooms.json";
import { validateDates } from "../logic/validateDates";
import { nightsCount, totalPrice } from "../logic/price";
import { saveBooking } from "../logic/bookingStore";

type Room = {
  id: string; name: string; type: "Single"|"Double"|"Suite";
  price: number; popularity: number; quantity: number;
  discount?: number; images: string[];
};

export default function Checkout() {
  const nav = useNavigate();
  const location = useLocation() as { state?: { roomId?: string } };
  const roomId = location.state?.roomId ?? (rooms as Room[])[0]?.id;
  const room = (rooms as Room[]).find(r => r.id === roomId);

  const [checkIn, setIn] = useState("");
  const [checkOut, setOut] = useState("");

  if (!room) return <div>ไม่พบห้องที่จะจอง</div>;

  const err = validateDates(checkIn, checkOut);
  const nights = checkIn && checkOut && !err ? nightsCount(checkIn, checkOut) : 0;
  const total = nights ? totalPrice(room.price, nights, room.discount ?? 0) : 0;

  const goPay = () => {
    const id = "B" + Date.now();
    saveBooking({
      id,
      roomId: room.id,
      roomName: room.name,
      price: room.price,
      discount: room.discount ?? 0,
      checkIn, checkOut,
      nights, total,
      status: "pending",
    });
    nav("/payment");
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-gray-600">เลือกวันที่เข้าพักและยืนยันยอดรวมก่อนชำระเงิน</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: form */}
        <div className="lg:col-span-2 rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-medium mb-4">Your stay</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Check-in</label>
              <input type="date" className="border rounded-lg px-3 py-2"
                value={checkIn} onChange={e=>setIn(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Check-out</label>
              <input type="date" className="border rounded-lg px-3 py-2"
                value={checkOut} onChange={e=>setOut(e.target.value)} />
            </div>
          </div>

          {checkIn && checkOut && err && (
            <div className="mt-4 p-3 rounded-lg border border-red-300 bg-red-50 text-sm text-red-700">
              {err}
            </div>
          )}

          <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border p-3 bg-gray-50">
              <div className="text-gray-500">คืนที่พัก</div>
              <div className="text-lg font-semibold">{nights}</div>
            </div>
            <div className="rounded-xl border p-3 bg-gray-50">
              <div className="text-gray-500">ราคา/คืน</div>
              <div className="text-lg font-semibold">฿{room.price.toLocaleString()}</div>
            </div>
            <div className="rounded-xl border p-3 bg-gray-50">
              <div className="text-gray-500">รวมทั้งหมด</div>
              <div className="text-lg font-semibold">
                ฿{total.toLocaleString()}
                {room.discount ? <span className="ml-1 text-green-600 text-xs">−{Math.round((room.discount)*100)}%</span> : null}
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Link to={`/rooms/${room.id}`} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
              กลับไปหน้าห้อง
            </Link>
            <button
              onClick={goPay}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90 disabled:opacity-50"
              disabled={!checkIn || !checkOut || !!err || nights <= 0}
            >
              ไปหน้าชำระเงิน
            </button>
          </div>
        </div>

        {/* Right: room summary */}
        <aside className="rounded-2xl border bg-white p-5 shadow-sm h-fit">
          <div className="img-frame mb-3">
            <img className="img-cover" src={room.images?.[0]} alt={room.name} />
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{room.name}</div>
              <div className="text-sm text-gray-600">{room.type}</div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-gray-100 text-xs">฿{room.price.toLocaleString()}/คืน</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
