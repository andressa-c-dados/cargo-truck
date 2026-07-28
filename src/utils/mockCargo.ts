import type { Cargo } from "../types/Cargo";


export const cargosMock: Cargo[] = [

  {
    id: "1",
    origem: "Belém",
    destino: "São Paulo",
    peso: 1200,
    volume: 15,
    status: "EM_TRANSITO",
  },


  {
    id: "2",
    origem: "Manaus",
    destino: "Recife",
    peso: 800,
    volume: 10,
    status: "ENTREGUE",
  },


  {
    id: "3",
    origem: "Fortaleza",
    destino: "Brasília",
    peso: 500,
    volume: 8,
    status: "PENDENTE",
  }

];