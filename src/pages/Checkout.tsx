import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/rooms.json";
import { validateDates } from "../logic/validateDates";
import { nightsCount, totalPrice } from "../logic/price";
import { saveBooking } from "../logic/bookingStore";

type Room = {
  id: string;
  name: string;
  type: "Single" | "Double" | "Suite";
  price: number;
  popularity: number;
  quantity: number;
  discount?: number;
  images: string[];
};

export default function Checkout() {
  const nav = useNavigate();
  const location = useLocation() as { state?: { roomId?: string } };
  const roomId = location.state?.roomId ?? (rooms as Room[])[0]?.id;
  const room = (rooms as Room[]).find((r) => r.id === roomId);

  const [checkIn, setIn] = useState("");
  const [checkOut, setOut] = useState("");

  if (!room) return <div className="alert alert-danger">Room not found</div>;

  const err = validateDates(checkIn, checkOut);
  const nights =
    checkIn && checkOut && !err ? nightsCount(checkIn, checkOut) : 0;
  const total = nights
    ? totalPrice(room.price, nights, room.discount ?? 0)
    : 0;

  const goPay = () => {
    const id = "B" + Date.now();
    saveBooking({
      id,
      roomId: room.id,
      roomName: room.name,
      price: room.price,
      discount: room.discount ?? 0,
      checkIn,
      checkOut,
      nights,
      total,
      status: "pending",
    });
    nav("/payment");
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3">Checkout</h1>
      <p className="text-muted">
        Select your check-in date and confirm the total amount before paying.
      </p>

      <div className="row g-4">
        {/* Left: form */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Your Stay</h5>

              {/* Date selection */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Check-in</label>
                  <input
                    type="date"
                    className="form-control"
                    value={checkIn}
                    onChange={(e) => setIn(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-out</label>
                  <input
                    type="date"
                    className="form-control"
                    value={checkOut}
                    onChange={(e) => setOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Error */}
              {checkIn && checkOut && err && (
                <div className="alert alert-danger">{err}</div>
              )}

              {/* Summary cards */}
              <div className="row text-center mb-3">
                <div className="col-md-4 mb-2">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="text-muted">Nights</div>
                      <h6>{nights}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="text-muted">Price per night</div>
                      <h6>฿{room.price.toLocaleString()}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="text-muted">Payment amount</div>
                      <h6>
                        ฿{total.toLocaleString()}{" "}
                        {room.discount ? (
                          <span className="text-success small">
                            −{Math.round(room.discount * 100)}%
                          </span>
                        ) : null}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex gap-2">
                <Link
                  to={`/rooms/${room.id}`}
                  className="btn btn-outline-secondary"
                >
                  Back
                </Link>
                <button
                  onClick={goPay}
                  className="btn btn-dark"
                  disabled={!checkIn || !checkOut || !!err || nights <= 0}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: room summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <img
              src={room.images?.[0]}
              className="card-img-top"
              alt={room.name}
            />
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title mb-1">{room.name}</h6>
                  <p className="text-muted small mb-0">{room.type}</p>
                </div>
                <span className="badge bg-light text-dark">
                  ฿{room.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
