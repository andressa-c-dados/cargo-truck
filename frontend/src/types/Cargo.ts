export type CargoStatus = "pending" | "in_transit" | "delivered";

export interface Cargo {
  id: number;
  origem: string;
  destino: string;
  peso: number;
  volume: number;
  status: CargoStatus;
}

export interface CargoInput {
  origem: string;
  destino: string;
  peso: number;
  volume: number;
  status: CargoStatus;
}

export const cargoStatusLabel: Record<CargoStatus, string> = {
  pending: "Pendente",
  in_transit: "Em trânsito",
  delivered: "Entregue",
};
