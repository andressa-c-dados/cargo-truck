use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Cargo {

    pub id: Option<u32>,

    pub origem: String,

    pub destino: String,

    pub peso: f64,

    pub volume: f64,

    pub status: String,
}