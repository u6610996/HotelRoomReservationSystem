import { useParams, useNavigate } from "react-router-dom";
import rooms from "../data/rooms.json";

type Room = {
  id: string; name: string; type: "Single"|"Double"|"Suite";
  price: number; popularity: number; quantity: number; images: string[];
  features: string[]; discount?: number;
};

export default function RoomDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const room = (rooms as Room[]).find(r => r.id === id);

  if (!room) return <div>ไม่พบบันทึกห้อง: {id}</div>;

  const onBook = () => nav("/checkout", { state: { roomId: room.id } });

  return (
    <section className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="img-frame banner shadow-sm">
            <img className="img-cover" src={room.images?.[0]} alt={room.name} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {room.images.slice(1).map((src, i) => (
              <div className="img-frame" key={i}>
                <img className="img-cover" src={src} alt={`${room.name} ${i+1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: summary card */}
        <aside className="rounded-2xl border bg-white p-5 shadow-sm h-fit">
          <h1 className="text-2xl font-semibold">{room.name}</h1>
          <p className="text-gray-600">{room.type}</p>

          <div className="mt-3 text-xl font-semibold">
            ฿{room.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">/คืน</span>
            {room.discount ? <span className="ml-2 text-green-600 text-sm">−{Math.round(room.discount*100)}%</span> : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {room.features.map(f => (
              <span key={f} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{f}</span>
            ))}
          </div>

          <button onClick={onBook} className="mt-5 w-full px-4 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90">
            จองห้องนี้
          </button>
          <p className="mt-2 text-xs text-gray-500">* เลือกวันที่และสรุปราคาในขั้นตอนถัดไป</p>
        </aside>
      </div>
    </section>
  );
}
