import { HashRouter as BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import RoomDetail from "./pages/RoomDetail";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavBar() {
  const activeClass = "btn btn-dark btn-sm me-2";
  const inactiveClass = "btn btn-outline-dark btn-sm me-2";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Orivelle</Link>

        <div className="d-flex">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Home
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Search
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Checkout
          </NavLink>
          <NavLink to="/payment" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Payment
          </NavLink>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-secondary btn-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="border-top py-3 mt-4">
        <div className="container text-center text-muted small">
          © 2025 HRRS — Demo for CSX4104
        </div>
      </footer>
    </BrowserRouter>
  );
}
