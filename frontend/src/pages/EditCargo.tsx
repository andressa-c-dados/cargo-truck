import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../services/api";
import { getCargoById, updateCargo } from "../services/cargoService";
import type { CargoInput } from "../types/Cargo";

export default function EditCargo() {
  const { id } = useParams();
  const numericId = Number(id);
  const navigate = useNavigate();
  const [cargo, setCargo] = useState<CargoInput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(numericId) || numericId <= 0) {
      setError("ID inválido.");
      return;
    }

    getCargoById(numericId)
      .then(({ origem, destino, peso, volume, status }) => setCargo({ origem, destino, peso, volume, status }))
      .catch((requestError) => setError(getApiErrorMessage(requestError, "Não foi possível carregar a carga.")));
  }, [numericId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!cargo) return;
    setSaving(true);
    setError(null);
    try {
      await updateCargo(numericId, cargo);
      navigate(`/volume/${numericId}`);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Não foi possível atualizar a carga."));
    } finally {
      setSaving(false);
    }
  }

  if (error && !cargo) return <div><h1 className="text-2xl font-bold">{error}</h1><Link to="/" className="inline-block mt-4 text-blue-700 hover:underline">Voltar</Link></div>;
  if (!cargo) return <p>Carregando carga...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Editar carga</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4">
        {error && <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>}
        <label className="block">Origem<input required className="w-full border p-2 rounded mt-1" value={cargo.origem} onChange={(e) => setCargo({ ...cargo, origem: e.target.value })} /></label>
        <label className="block">Destino<input required className="w-full border p-2 rounded mt-1" value={cargo.destino} onChange={(e) => setCargo({ ...cargo, destino: e.target.value })} /></label>
        <label className="block">Peso (kg)<input required min="0.01" step="0.01" type="number" className="w-full border p-2 rounded mt-1" value={cargo.peso} onChange={(e) => setCargo({ ...cargo, peso: Number(e.target.value) })} /></label>
        <label className="block">Volume (m³)<input required min="0.01" step="0.01" type="number" className="w-full border p-2 rounded mt-1" value={cargo.volume} onChange={(e) => setCargo({ ...cargo, volume: Number(e.target.value) })} /></label>
        <label className="block">Status<select className="w-full border p-2 rounded mt-1" value={cargo.status} onChange={(e) => setCargo({ ...cargo, status: e.target.value as CargoInput["status"] })}><option value="pending">Pendente</option><option value="in_transit">Em trânsito</option><option value="delivered">Entregue</option></select></label>
        <div className="flex gap-3"><button disabled={saving} className="bg-slate-900 text-white px-5 py-2 rounded disabled:opacity-50">{saving ? "Salvando..." : "Salvar alterações"}</button><Link to={`/volume/${numericId}`} className="px-5 py-2 rounded border">Cancelar</Link></div>
      </form>
    </div>
  );
}
