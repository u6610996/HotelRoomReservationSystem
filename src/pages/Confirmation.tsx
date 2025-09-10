import { Link, useNavigate } from "react-router-dom";
import { loadBooking, clearBooking } from "../logic/bookingStore";

export default function Confirmation() {
  const nav = useNavigate();
  const booking = loadBooking();

  if (!booking || booking.status !== "confirmed") {
    return (
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <p>ไม่พบการจองที่ยืนยันแล้ว</p>
        <Link to="/search" className="underline text-sm">กลับไปค้นหาห้อง</Link>
      </section>
    );
  }

  const onCancel = () => { clearBooking(); nav("/search"); };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="text-2xl">✅ การจองสำเร็จ</div>
        <p className="text-gray-600 mt-1">ขอบคุณสำหรับการจอง!</p>

        <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border p-3 bg-gray-50">
            <div className="text-gray-500">Booking Ref</div>
            <div className="text-lg font-semibold">{booking.id}</div>
          </div>
          <div className="rounded-xl border p-3 bg-gray-50">
            <div className="text-gray-500">ห้อง</div>
            <div className="text-lg font-semibold">{booking.roomName} ({booking.roomId})</div>
          </div>
          <div className="rounded-xl border p-3 bg-gray-50">
            <div className="text-gray-500">ช่วงพัก</div>
            <div className="text-lg font-semibold">{booking.checkIn} → {booking.checkOut} ({booking.nights} คืน)</div>
          </div>
          <div className="rounded-xl border p-3 bg-gray-50">
            <div className="text-gray-500">ยอดรวม</div>
            <div className="text-lg font-semibold">฿{booking.total.toLocaleString()}</div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
            ยกเลิกการจอง
          </button>
          <Link to="/search" className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
            กลับไปค้นหาห้อง
          </Link>
        </div>
      </div>
    </section>
  );
}
