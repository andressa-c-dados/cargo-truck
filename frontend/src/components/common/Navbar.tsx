import { Link } from "react-router-dom";
import { FaTruck, FaPlusCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
          <img src="/images/logo.png" alt="Cargo Truck Logo" style={{ height: '40px', objectFit: 'contain', borderRadius: '8px' }} />
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">
            <MdDashboard size={20} />
            Painel Administrativo
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