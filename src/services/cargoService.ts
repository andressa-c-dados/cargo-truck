import api from "./api";

import type { Cargo } from "../types/Cargo";

import { cargosMock } from "../utils/mockCargo";


export async function getCargos(): Promise<Cargo[]> {

  // temporário: simulando API
  return cargosMock;

}



export async function getCargoById(
  id: string
): Promise<Cargo | undefined> {

  const cargo = cargosMock.find(
    (cargo) => cargo.id === id
  );

  return cargo;

}



export async function createCargo(
  cargo: Cargo
): Promise<Cargo> {

  const response = await api.post<Cargo>(
    "/cargo",
    cargo
  );

  return response.data;

}