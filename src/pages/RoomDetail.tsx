import { useParams, useNavigate } from "react-router-dom";
import rooms from "../data/rooms.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

type Room = {
  id: string; name: string; type: "Single"|"Double"|"Suite";
  price: number; popularity: number; quantity: number; images: string[];
  features: string[]; discount?: number;
};

export default function RoomDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const room = (rooms as Room[]).find(r => r.id === id);

  if (!room) return <div className="container py-5">ไม่พบบันทึกห้อง: {id}</div>;

  const onBook = () => nav("/checkout", { state: { roomId: room.id } });

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Left: carousel images */}
        <div className="col-lg-8">
          <div id="roomCarousel" className="carousel slide shadow-sm rounded overflow-hidden" data-bs-ride="carousel">
            <div className="carousel-inner">
              {room.images.map((src, i) => (
                <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                  <img src={src} className="d-block w-100" alt={`${room.name} ${i + 1}`} style={{ objectFit: "cover", height: "450px" }} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#roomCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#roomCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-3 d-flex flex-wrap gap-2">
            {room.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="rounded border"
                style={{ width: "100px", height: "70px", objectFit: "cover", cursor: "pointer" }}
                data-bs-target="#roomCarousel"
                data-bs-slide-to={i}
              />
            ))}
          </div>
        </div>

        {/* Right: summary card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: "80px" }}>
            <div className="card-body">
              <h2 className="card-title h4">{room.name}</h2>
              <p className="text-muted mb-3">{room.type}</p>

              <h4 className="fw-bold text-primary">
                ฿{room.price.toLocaleString()} 
                {room.discount && (
                  <span className="ms-2 badge bg-success">
                    −{Math.round(room.discount * 100)}%
                  </span>
                )}
              </h4>

              <div className="mt-3">
                {room.features.map(f => (
                  <span key={f} className="badge bg-light text-dark border me-2 mb-2">{f}</span>
                ))}
              </div>

              <button
                onClick={onBook}
                className="btn btn-dark btn-lg w-100 mt-4"
              >
                Book this room
              </button>
              <p className="text-muted small mt-2">
                * Select the date and finalize the price in the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
