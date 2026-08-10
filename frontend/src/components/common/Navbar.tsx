import { Link } from "react-router-dom";
import { FaTruck, FaPlusCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <FaTruck size={28} />
          <span>Cargo Truck</span>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <MdDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/cargo/create" className="nav-link">
            <FaPlusCircle size={20} />
            Nova Carga
          </Link>
        </div>
      </div>
    </nav>
  );
}