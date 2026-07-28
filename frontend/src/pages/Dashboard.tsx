import SummaryCard from "../components/dashboard/SummaryCard";
import CargoTable from "../components/dashboard/CargoTable";
import { useEffect, useState } from "react";
import { getCargos } from "../services/cargoService";
import type { Cargo } from "../types/Cargo";


export default function Dashboard() {


  const [cargos, setCargos] = useState<Cargo[]>([]);


  useEffect(() => {

    async function carregarCargos() {

      const dados = await getCargos();

      setCargos(dados);

    }

    carregarCargos();

  }, []);



  const totalCargas = cargos.length;


  const emTransito = cargos.filter(
    (cargo) => cargo.status === "Em trânsito"
  ).length;


  const entregues = cargos.filter(
    (cargo) => cargo.status === "Entregue"
  ).length;



  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>


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


      <CargoTable cargos={cargos} />

    </div>

  );
}