import { useNavigate, Link } from "react-router-dom";
import { loadBooking, saveBooking } from "../logic/bookingStore";

export default function Payment() {
  const nav = useNavigate();
  const booking = loadBooking();

  if (!booking) {
    return (
      <div className="container my-5">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="mb-2">There is no payment</p>
            <Link to="/search" className="btn btn-link">
              Back to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onCancel = () => nav("/checkout");
  const onConfirm = () => {
    saveBooking({ ...booking, status: "confirmed" });
    nav("/confirmation");
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left: QR Payment */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Payment (Mock)</h4>
              <p className="text-muted small mb-4">
                Fake PromptPay QR for demo only
              </p>

              <div className="text-center">
                <img
                  src="https://apps.odoo.com/apps/icon_image?module_id=87744"
                  alt="QR PromptPay (Mock)"
                  className="img-fluid rounded mb-3"
                  style={{ maxWidth: "300px" }}
                />
              </div>

              <div className="d-flex gap-2">
                <button onClick={onCancel} className="btn btn-outline-secondary">
                  cancle
                </button>
                <button onClick={onConfirm} className="btn btn-dark">
                  Transfered / Done
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Room: <strong>{booking.roomName}</strong> ({booking.roomId})
                </li>
                <li className="list-group-item">
                  Time peroid:{" "}
                  <strong>{booking.checkIn}</strong> →{" "}
                  <strong>{booking.checkOut}</strong> ({booking.nights} nights)
                </li>
                <li className="list-group-item">
                  Payment amount:{" "}
                  <strong>฿{booking.total.toLocaleString()}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
