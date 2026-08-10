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
    <div className="app-container">
      <h1 className="page-title">Editar carga</h1>
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
          <input required min="0.01" step="0.01" type="number" className="form-input" value={cargo.peso} onChange={(e) => setCargo({ ...cargo, peso: Number(e.target.value) })} />
        </div>

        <div className="form-group">
          <label className="form-label">Volume (m³)</label>
          <input required min="0.01" step="0.01" type="number" className="form-input" value={cargo.volume} onChange={(e) => setCargo({ ...cargo, volume: Number(e.target.value) })} />
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
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
          <Link to={`/volume/${numericId}`} className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
