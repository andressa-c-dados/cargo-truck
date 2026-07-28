import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getApiErrorMessage } from "../services/api";
import { createCargo } from "../services/cargoService";
import type { CargoInput } from "../types/Cargo";

const initialCargo: CargoInput = {
  origem: "",
  destino: "",
  peso: 0,
  volume: 0,
  status: "in_transit",
};

export default function CreateCargo() {
  const [cargo, setCargo] = useState<CargoInput>(initialCargo);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const created = await createCargo(cargo);
      navigate(`/volume/${created.id}`);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Não foi possível criar a carga."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Criar nova carga</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-xl space-y-4">
        {error && <p className="rounded bg-red-100 p-3 text-red-700">{error}</p>}
        <label className="block">Origem<input required className="w-full border p-2 rounded mt-1" value={cargo.origem} onChange={(e) => setCargo({ ...cargo, origem: e.target.value })} /></label>
        <label className="block">Destino<input required className="w-full border p-2 rounded mt-1" value={cargo.destino} onChange={(e) => setCargo({ ...cargo, destino: e.target.value })} /></label>
        <label className="block">Peso (kg)<input required min="0.01" step="0.01" type="number" className="w-full border p-2 rounded mt-1" value={cargo.peso || ""} onChange={(e) => setCargo({ ...cargo, peso: Number(e.target.value) })} /></label>
        <label className="block">Volume (m³)<input required min="0.01" step="0.01" type="number" className="w-full border p-2 rounded mt-1" value={cargo.volume || ""} onChange={(e) => setCargo({ ...cargo, volume: Number(e.target.value) })} /></label>
        <label className="block">Status<select className="w-full border p-2 rounded mt-1" value={cargo.status} onChange={(e) => setCargo({ ...cargo, status: e.target.value as CargoInput["status"] })}><option value="pending">Pendente</option><option value="in_transit">Em trânsito</option><option value="delivered">Entregue</option></select></label>
        <button disabled={saving} className="bg-slate-900 text-white px-5 py-2 rounded disabled:opacity-50">{saving ? "Salvando..." : "Salvar carga"}</button>
      </form>
    </div>
  );
}
