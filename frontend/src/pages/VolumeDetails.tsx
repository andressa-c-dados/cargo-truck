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
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !cargo) {
    return (
      <div>
        <h1 className="text-2xl font-bold">
          {error ?? "Carga não encontrada"}
        </h1>

        <Link
          to="/"
          className="inline-block mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          ← Voltar
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-block mb-6 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Detalhes da Carga</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-xl">
        <p className="mb-2">
          <strong>ID:</strong> {cargo.id}
        </p>

        <p className="mb-2">
          <strong>Origem:</strong> {cargo.origem}
        </p>

        <p className="mb-2">
          <strong>Destino:</strong> {cargo.destino}
        </p>

        <p className="mb-2">
          <strong>Peso:</strong> {cargo.peso} kg
        </p>

        <p className="mb-2">
          <strong>Volume:</strong> {cargo.volume} m³
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {cargoStatusLabel[cargo.status]}
        </p>

        <div className="mt-6 flex gap-3">
          <Link to={`/cargo/${cargo.id}/edit`} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Editar</Link>
          <button onClick={handleDelete} disabled={deleting} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition disabled:opacity-50">{deleting ? "Removendo..." : "Excluir"}</button>
        </div>
      </div>
    </div>
  );
}
