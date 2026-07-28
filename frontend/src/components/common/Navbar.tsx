import { Link } from "react-router-dom";
import { FaTruck, FaPlusCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 shadow-lg text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <div className="flex items-center gap-3">
          <FaTruck size={28} />
          <h1 className="text-2xl font-bold">
            Cargo Truck
          </h1>
        </div>

        <div className="flex gap-8">

          <Link
            to="/"
            className="flex items-center gap-2 hover:text-blue-200 transition"
          >
            <MdDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/cargo/create"
            className="flex items-center gap-2 hover:text-blue-200 transition"
          >
            <FaPlusCircle size={20} />
            Nova Carga
          </Link>

        </div>

      </div>
    </nav>
  );
}