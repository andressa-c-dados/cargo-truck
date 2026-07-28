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



  const emTransito = cargos.filter(
    (cargo) => cargo.status === "in_transit"
  ).length;



  const entregues = cargos.filter(
    (cargo) => cargo.status === "delivered"
  ).length;



  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {error && <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}



      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


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



      {loading ? <p className="mt-8">Carregando cargas...</p> : <CargoTable cargos={cargos} />}


    </div>

  );
}
