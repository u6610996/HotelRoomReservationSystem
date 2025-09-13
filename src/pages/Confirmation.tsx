import { Link, useNavigate } from "react-router-dom";
import { loadBooking, clearBooking } from "../logic/bookingStore";

export default function Confirmation() {
  const nav = useNavigate();
  const booking = loadBooking();

  if (!booking || booking.status !== "confirmed") {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          <h5 className="mb-2">⚠️ Booking confermation not found</h5>
          <Link to="/search" className="btn btn-link">
            Search
          </Link>
        </div>
      </div>
    );
  }

  const onCancel = () => {
    clearBooking();
    nav("/search");
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-5 text-center">
          <h2 className="text-success mb-3">Booking Successful</h2>
          <p className="text-muted">Thank you for Booking with us</p>

          {/* Booking Details */}
          <div className="row mt-4 g-3">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="text-muted">Booking Ref</h6>
                  <p className="fw-bold fs-5 mb-0">{booking.id}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="text-muted">Room</h6>
                  <p className="fw-bold fs-5 mb-0">
                    {booking.roomName} ({booking.roomId})
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="text-muted">Time peroid</h6>
                  <p className="fw-bold fs-5 mb-0">
                    {booking.checkIn} → {booking.checkOut} ({booking.nights} nights)
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="text-muted">Payment amount</h6>
                  <p className="fw-bold fs-5 text-success mb-0">
                    ฿{booking.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 d-flex justify-content-center gap-3">
            <button
              onClick={onCancel}
              className="btn btn-outline-danger px-4"
            >
              Cancle
            </button>
            <Link to="/" className="btn btn-primary px-4">
              Done
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
