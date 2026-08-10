import { Link } from "react-router-dom";

import { cargoStatusLabel, type Cargo } from "../../types/Cargo";

interface CargoTableProps {
  cargos: Cargo[];
}

export default function CargoTable({ cargos }: CargoTableProps) {

function getStatusClass(status: Cargo["status"]) {
  switch (status) {
    case "delivered": return "badge badge-delivered";
    case "in_transit": return "badge badge-intransit";
    case "pending": return "badge badge-pending";
    default: return "badge badge-default";
  }
}

  return (
    <div className="table-container mt-8">
      <div className="table-header-title">
        Últimas cargas
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cargos.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhuma carga cadastrada.
              </td>
            </tr>
          ) : (
            cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td>
                  <Link to={`/volume/${cargo.id}`} className="table-link">
                    {cargo.id}
                  </Link>
                </td>
                <td>{cargo.origem}</td>
                <td>{cargo.destino}</td>
                <td>
                  <span className={getStatusClass(cargo.status ?? "")}>
                    {cargoStatusLabel[cargo.status]}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
