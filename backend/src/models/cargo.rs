use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum CargoStatus {
    Pending,
    InTransit,
    Delivered,
}

#[derive(Debug, Clone, Serialize)]
pub struct Cargo {
    pub id: u64,
    pub origem: String,
    pub destino: String,
    pub peso: f64,
    pub volume: f64,
    pub status: CargoStatus,
}

#[derive(Debug, Deserialize)]
pub struct CargoInput {
    pub origem: String,
    pub destino: String,
    pub peso: f64,
    pub volume: f64,
    pub status: CargoStatus,
}
