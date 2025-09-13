import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Landing() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        {/* Hero Image */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <img
              src="https://images.trvl-media.com/lodging/7000000/6490000/6481500/6481447/59ad3e10.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
              className="card-img-top rounded"
              alt="Hotel hero"
            />
          </div>
        </div>

        {/* Text + CTA */}
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold">Welcome to Our Hotel</h1>
          <p className="text-muted mt-3">
            Find and choose the your room easily! — filter by type, price, availability, and features.
          </p>

          {/* Feature badges */}
          <div className="mt-4 d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark border">Fast Filter</span>
            <span className="badge bg-light text-dark border">Date Validation</span>
            <span className="badge bg-light text-dark border">Mock Payment (QR)</span>
            <span className="badge bg-light text-dark border">Persist Booking</span>
          </div>

          {/* Buttons */}
          <div className="mt-4 d-flex gap-3 flex-wrap">
            <Link to="/search" className="btn btn-dark btn-lg">
              Search
            </Link>
            <Link to="/rooms/D201" className="btn btn-outline-secondary btn-lg">
              View sample room
            </Link>
          </div>
        </div>
      </div>

      {/* Preview Carousel */}
      <h2 className="text-muted mt-3">
            Preview facilities
      </h2>
      <div id="carouselExampleControls" className="carousel slide mt-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://pix8.agoda.net/hotelImages/283/28347347/28347347_211020143400106657457.jpg?s=1024x"
              alt="First slide"
              style={{ height: '700px', objectFit: 'cover' }}
            />
             <div className="carousel-caption d-none d-md-block">
              <h1>Lobby</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://www.maritim.com/fileadmin/_processed_/0/1/csm_Bpa_363_Superior_500a005b62.jpg"
              alt="Second slide"
              style={{ height: '700px', objectFit: 'cover' }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h1>Hotel Room</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/351060271.jpg?k=ad1e2904bedc6db7acb01df07611470e2be5ef5c67e638ed925ccc3f5091fb73&o=&s=1024x"
              alt="Third slide"
              style={{ height: '700px', objectFit: 'cover' }}
            />
             <div className="carousel-caption d-none d-md-block">
              <h1>Roof Top Pool</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://media.z-suite.it/hotelmargherita.info/public/crop/Ristorante--Foto-Ristorante-ambienti--Ristorante_MAma_Hotel_Margherita_sala_e_terrazza-790x450.jpg?v=2"
              alt="Third slide"
              style={{ height: '700px', objectFit: 'cover' }}
            />
             <div className="carousel-caption d-none d-md-block">
              <h1>Dinning Room</h1>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
}
