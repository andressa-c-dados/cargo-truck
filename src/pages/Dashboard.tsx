import SummaryCard from "../components/dashboard/SummaryCard";
import CargoTable from "../components/dashboard/CargoTable";

import { cargosMock } from "../utils/mockCargo";


export default function Dashboard() {


  const totalCargas = cargosMock.length;


  const emTransito = cargosMock.filter(
    (cargo) => cargo.status === "EM_TRANSITO"
  ).length;


  const entregues = cargosMock.filter(
    (cargo) => cargo.status === "ENTREGUE"
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


      <CargoTable />

    </div>

  );
}