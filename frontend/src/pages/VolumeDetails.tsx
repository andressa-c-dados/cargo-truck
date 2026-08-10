import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../services/api";
import { deleteCargo, getCargoById } from "../services/cargoService";
import { cargoStatusLabel, type Cargo } from "../types/Cargo";

export default function VolumeDetails() {
  const { id } = useParams();

  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCargo() {
      if (!id) {
        setError("ID não informado na URL.");
        setLoading(false);
        return;
      }

      const numericId = Number(id);

      if (Number.isNaN(numericId)) {
        setError("ID inválido.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCargoById(numericId);
        if (data) {
          setCargo(data);
        } else {
          setError("Carga não encontrada.");
        }
      } catch (requestError) {
        setError(getApiErrorMessage(requestError, "Erro ao buscar carga."));
      } finally {
        setLoading(false);
      }
    }

    loadCargo();
  }, [id]);

  async function handleDelete() {
    if (!cargo || !window.confirm("Deseja remover esta carga?")) return;

    setDeleting(true);
    try {
      await deleteCargo(cargo.id);
      navigate("/");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Não foi possível remover a carga."));
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="app-container">
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  if (error || !cargo) {
    return (
      <div className="app-container">
        <h1 className="page-title" style={{ color: 'var(--brand-primary)' }}>
          {error ?? "Carga não encontrada"}
        </h1>

        <Link to="/" className="btn-secondary" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '1rem' }}>
          ← Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Link to="/" className="btn-secondary" style={{ display: 'inline-block', textDecoration: 'none', marginBottom: '2rem' }}>
        ← Voltar
      </Link>

      <h1 className="page-title">Detalhes da Carga</h1>

      <div className="form-container" style={{ padding: '2rem' }}>
        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>ID:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{cargo.id}</span>
        </p>

        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>Origem:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cargo.origem}</span>
        </p>

        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>Destino:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cargo.destino}</span>
        </p>

        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>Peso:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cargo.peso} kg</span>
        </p>

        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>Volume:</strong> <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{cargo.volume} m³</span>
        </p>

        <p className="form-group" style={{ marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-muted)' }}>Status:</strong> 
          <span style={{ marginLeft: '0.5rem', fontWeight: '600', color: 'var(--brand-orange)' }}>
            {cargoStatusLabel[cargo.status]}
          </span>
        </p>

        <div className="btn-group" style={{ marginTop: '2rem' }}>
          <Link to={`/cargo/${cargo.id}/edit`} className="btn-primary" style={{ textDecoration: 'none' }}>Editar</Link>
          <button onClick={handleDelete} disabled={deleting} className="btn-secondary" style={{ color: 'var(--brand-primary)', borderColor: 'var(--brand-primary)' }}>
            {deleting ? "Removendo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
