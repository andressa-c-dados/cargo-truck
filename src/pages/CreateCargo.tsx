import { useState } from "react";
import { createCargo } from "../services/cargoService";

export default function CreateCargo() {

const [cargo, setCargo] = useState({
  origem: "",
  destino: "",
  peso: 0,
  volume: 0,
  status: "Em trânsito",
});
   async function handleSubmit(e: React.FormEvent) {

  e.preventDefault();


  await createCargo({
  origem: cargo.origem,
  destino: cargo.destino,
  peso: cargo.peso,
  volume: cargo.volume,
  status: cargo.status,
});


  alert("Carga criada!");
}



  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Criar nova carga
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow max-w-xl"
      >

        <div className="mb-4">

          <label>
            Origem
          </label>

          <input
            className="w-full border p-2 rounded mt-1"
            value={cargo.origem}
            onChange={(e) =>
              setCargo({
                ...cargo,
                origem: e.target.value
              })
            }
          />

        </div>


        <div className="mb-4">

          <label>
            Destino
          </label>

          <input
            className="w-full border p-2 rounded mt-1"
            value={cargo.destino}
            onChange={(e) =>
              setCargo({
                ...cargo,
                destino: e.target.value
              })
            }
          />

        </div>


        <div className="mb-4">

          <label>
            Peso
          </label>

          <input
  type="number"
  className="w-full border p-2 rounded mt-1"
  value={cargo.peso}
  onChange={(e) =>
    setCargo({
      ...cargo,
      peso: Number(e.target.value)
    })
  }
/>

        </div>


        <div className="mb-4">

          <label>
            Volume
          </label>

          <input
  type="number"
  className="w-full border p-2 rounded mt-1"
  value={cargo.volume}
  onChange={(e) =>
    setCargo({
      ...cargo,
      volume: Number(e.target.value)
    })
  }
/>

        </div>


        <button
          className="bg-slate-900 text-white px-5 py-2 rounded hover:bg-slate-700"
        >
          Salvar carga
        </button>


      </form>

    </div>
  );
}