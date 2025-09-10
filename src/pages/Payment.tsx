import { useNavigate, Link } from "react-router-dom";
import { loadBooking, saveBooking } from "../logic/bookingStore";

export default function Payment() {
  const nav = useNavigate();
  const booking = loadBooking();

  if (!booking) {
    return (
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <p>ยังไม่มีรายการชำระเงิน</p>
        <Link to="/search" className="underline text-sm">กลับไปค้นหาห้อง</Link>
      </section>
    );
  }

  const onCancel = () => nav("/checkout");
  const onConfirm = () => {
    saveBooking({ ...booking, status: "confirmed" });
    nav("/confirmation");
  };

  return (
    <section className="grid lg:grid-cols-3 gap-6">
      {/* QR */}
      <div className="lg:col-span-2 rounded-2xl border bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold">ชำระเงิน (Mock)</h1>
        <p className="text-sm text-gray-500 mb-4">QR พร้อมเพย์ปลอมสำหรับเดโมเท่านั้น</p>

        <div className="img-frame square mx-auto max-w-sm">
          <img className="img-cover" src="/images/mock/qr.png" alt="QR PromptPay (Mock)" />
        </div>

        <div className="mt-5 flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">ยกเลิก</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:opacity-90">
            โอนแล้ว / ตกลง
          </button>
        </div>
      </div>

      {/* Summary */}
      <aside className="rounded-2xl border bg-white p-5 shadow-sm h-fit">
        <h2 className="font-medium mb-3">สรุปรายการ</h2>
        <div className="space-y-1 text-sm">
          <div>ห้อง: <strong>{booking.roomName}</strong> ({booking.roomId})</div>
          <div>ช่วงพัก: <strong>{booking.checkIn}</strong> → <strong>{booking.checkOut}</strong> ({booking.nights} คืน)</div>
          <div>ยอดชำระ: <strong>฿{booking.total.toLocaleString()}</strong></div>
        </div>
      </aside>
    </section>
  );
}
