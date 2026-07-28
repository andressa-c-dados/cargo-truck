import api from "./api";
import type { Cargo } from "../types/Cargo";


export async function getCargos(): Promise<Cargo[]> {

  const response = await api.get<Cargo[]>("/cargos");

  return response.data;

}



export async function getCargoById(
  id: number
): Promise<Cargo> {

  const response = await api.get<Cargo>(
    `/cargos/${id}`
  );

  return response.data;

}



export async function createCargo(
  cargo: Cargo
): Promise<Cargo> {

  const response = await api.post<Cargo>(
    "/cargos",
    cargo
  );

  return response.data;

}