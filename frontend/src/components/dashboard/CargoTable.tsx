
import { Link } from "react-router-dom";


import type { Cargo } from "../../types/Cargo";


interface CargoTableProps {
  cargos: Cargo[];
}


export default function CargoTable({
  cargos
}: CargoTableProps) {


function getStatusClass(status: string) {

  switch (status) {

    case "Entregue":
      return "bg-green-100 text-green-700";

    case "Em trânsito":
      return "bg-blue-100 text-blue-700";

    case "Pendente":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }

}

  return (
    <div className="bg-white rounded-lg shadow mt-8">


      <div className="p-5">

        <h2 className="text-xl font-bold">
          Últimas cargas
        </h2>

      </div>



      <table className="w-full">


        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              ID
            </th>

            <th className="p-3 text-left">
              Origem
            </th>

            <th className="p-3 text-left">
              Destino
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>



        <tbody>

  {cargos.length === 0 ? (

    <tr>

      <td
        colSpan={4}
        className="text-center p-8 text-gray-500"
      >
        Nenhuma carga cadastrada.
      </td>

    </tr>

  ) : (

    cargos.map((cargo) => (

      <tr
        key={cargo.id}
        className="border-t hover:bg-gray-50"
      >

        <td className="p-3">

          <Link
            to={`/volume/${cargo.id}`}
            className="text-blue-600 hover:underline"
          >
            {cargo.id}
          </Link>

        </td>

        <td className="p-3">
          {cargo.origem}
        </td>

        <td className="p-3">
          {cargo.destino}
        </td>

        <td className="p-3">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(cargo.status ?? "")}`}
          >
            {cargo.status}
          </span>

        </td>

      </tr>

    ))

  )}

</tbody>


      </table>


    </div>
  );
}