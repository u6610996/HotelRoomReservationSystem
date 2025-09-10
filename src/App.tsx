import { HashRouter as BrowserRouter, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import RoomDetail from "./pages/RoomDetail";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";

function NavBar() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm ${isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-base font-semibold">Hotel Room Reservation System</Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/search" className={linkCls}>Search</NavLink>
          <NavLink to="/checkout" className={linkCls}>Checkout</NavLink>
          <NavLink to="/payment" className={linkCls}>Payment</NavLink>
          <a
            href="https://github.com"
            target="_blank" rel="noreferrer"
            className="ml-1 px-3 py-2 rounded-lg text-sm border hover:bg-gray-50"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
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
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-gray-500">
          © 2025 HRRS — Demo for CSX4104
        </div>
      </footer>
    </BrowserRouter>
  );
}
