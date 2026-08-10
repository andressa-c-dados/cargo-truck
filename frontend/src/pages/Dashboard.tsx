import { useEffect, useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";
import CargoTable from "../components/dashboard/CargoTable";

import { getCargos } from "../services/cargoService";
import type { Cargo } from "../types/Cargo";

export default function Dashboard() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCargos() {
      try {
        setError(null);
        setCargos(await getCargos());
      } catch {
        setError("Não foi possível carregar as cargas. Verifique se a API está em execução.");
      } finally {
        setLoading(false);
      }
    }
    carregarCargos();
  }, []);

  const totalCargas = cargos.length;
  const emTransito = cargos.filter((cargo) => cargo.status === "in_transit").length;
  const entregues = cargos.filter((cargo) => cargo.status === "delivered").length;

  return (
    <div className="app-container">
      <h1 className="page-title">
        Dashboard
      </h1>

      {error && <p className="mb-4 rounded p-3" style={{ background: 'rgba(232, 29, 98, 0.2)', color: '#ffb3c6', border: '1px solid var(--brand-primary)' }}>{error}</p>}

      <div className="cards-grid">
        <SummaryCard
          title="Total de cargas"
          value={totalCargas}
        />
        <SummaryCard
          title="Em trânsito"
          value={emTransito}
        />
        <SummaryCard
          title="Entregues"
          value={entregues}
        />
      </div>

      {loading ? (
        <p className="text-muted mt-8">Carregando cargas...</p>
      ) : (
        <CargoTable cargos={cargos} />
      )}
    </div>
  );
}
