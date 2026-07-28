import api from "./api";

import type { Cargo, CargoInput } from "../types/Cargo";


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
  cargo: CargoInput
): Promise<Cargo> {

  const response = await api.post<Cargo>(
    "/cargos",
    cargo
  );

  return response.data;

}

export async function updateCargo(id: number, cargo: CargoInput): Promise<Cargo> {
  const response = await api.put<Cargo>(`/cargos/${id}`, cargo);
  return response.data;
}

export async function deleteCargo(id: number): Promise<void> {
  await api.delete(`/cargos/${id}`);
}
