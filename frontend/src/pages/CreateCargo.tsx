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
    <div className="app-container">
      <h1 className="page-title">Criar nova carga</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <p className="mb-4 rounded p-3" style={{ background: 'rgba(232, 29, 98, 0.2)', color: '#ffb3c6', border: '1px solid var(--brand-primary)' }}>{error}</p>}
        
        <div className="form-group">
          <label className="form-label">Origem</label>
          <input required className="form-input" value={cargo.origem} onChange={(e) => setCargo({ ...cargo, origem: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Destino</label>
          <input required className="form-input" value={cargo.destino} onChange={(e) => setCargo({ ...cargo, destino: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Peso (kg)</label>
          <input required min="0.01" step="0.01" type="number" className="form-input" value={cargo.peso || ""} onChange={(e) => setCargo({ ...cargo, peso: Number(e.target.value) })} />
        </div>

        <div className="form-group">
          <label className="form-label">Volume (m³)</label>
          <input required min="0.01" step="0.01" type="number" className="form-input" value={cargo.volume || ""} onChange={(e) => setCargo({ ...cargo, volume: Number(e.target.value) })} />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={cargo.status} onChange={(e) => setCargo({ ...cargo, status: e.target.value as CargoInput["status"] })}>
            <option value="pending">Pendente</option>
            <option value="in_transit">Em trânsito</option>
            <option value="delivered">Entregue</option>
          </select>
        </div>

        <div className="btn-group">
          <button disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.5 : 1 }}>
            {saving ? "Salvando..." : "Salvar carga"}
          </button>
        </div>
      </form>
    </div>
  );
}
