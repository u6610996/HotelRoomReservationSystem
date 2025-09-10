import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center">
      {/* Hero Image */}
      <div className="img-frame banner shadow-sm">
        <img className="img-cover" src="/images/rooms/D201/main.jpg" alt="Hotel hero" />
      </div>

      {/* Text + CTA */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Welcome to Our Hotel</h1>
        <p className="mt-3 text-gray-600">
          ค้นหาและเลือกห้องที่ใช่ได้อย่างรวดเร็ว — กรองตามประเภท ราคา ความพร้อม และฟีเจอร์ต่าง ๆ
        </p>

        {/* Feature badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-white border text-sm">Fast Filter</span>
          <span className="px-3 py-1 rounded-full bg-white border text-sm">Date Validation</span>
          <span className="px-3 py-1 rounded-full bg-white border text-sm">Mock Payment (QR)</span>
          <span className="px-3 py-1 rounded-full bg-white border text-sm">Persist Booking</span>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to="/search" className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90">
            เริ่มค้นหาห้อง
          </Link>
          <Link to="/rooms/D201" className="px-5 py-3 rounded-xl border bg-white hover:bg-gray-50">
            ดูตัวอย่างห้อง
          </Link>
        </div>
      </div>

      {/* Preview strip (optional, desktop look) */}
      <div className="lg:col-span-2 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="img-frame">
          <img className="img-cover" src="/images/rooms/S101/main.jpg" alt="Preview 1" />
        </div>
        <div className="img-frame">
          <img className="img-cover" src="/images/rooms/D203/main.jpg" alt="Preview 2" />
        </div>
        <div className="img-frame">
          <img className="img-cover" src="/images/rooms/Q301/main.jpg" alt="Preview 3" />
        </div>
      </div>
    </section>
  );
}
