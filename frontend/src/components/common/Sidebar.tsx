import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Cargo Truck
      </h1>

      <nav className="flex flex-col gap-4">

        <Link 
          to="/"
          className="hover:bg-slate-700 p-2 rounded"
        >
          Dashboard
        </Link>


        <Link
          to="/cargo/create"
          className="hover:bg-slate-700 p-2 rounded"
        >
          Nova Carga
        </Link>


      </nav>

    </aside>
  );
}