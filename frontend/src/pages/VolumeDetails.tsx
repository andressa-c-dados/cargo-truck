import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";

import { getCargoById } from "../services/cargoService";
import type { Cargo } from "../types/Cargo";

<Link
  to="/"
  className="inline-block mb-6 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
>
  ← Voltar
</Link>

export default function VolumeDetails() {

  const { id } = useParams();

  const [cargo, setCargo] = useState<Cargo | null>(null);


  useEffect(() => {

    async function loadCargo() {

      if (!id) return;


      const data = await getCargoById(id);


      if (data) {
        setCargo(data);
      }

    }


    loadCargo();


  }, [id]);



  if (!cargo) {
    return (
      <h1 className="text-2xl font-bold">
        Carga não encontrada
      </h1>
    );
  }



  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Detalhes da Carga
      </h1>


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
          <strong>Peso:</strong> {cargo.peso}
        </p>

        <p className="mb-2">
          <strong>Volume:</strong> {cargo.volume}
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {cargo.status}
        </p>

      </div>

    </div>
  );
}