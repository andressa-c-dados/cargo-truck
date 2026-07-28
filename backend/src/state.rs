use std::sync::{
    Arc,
    atomic::{AtomicU64, Ordering},
};

use tokio::sync::RwLock;

use crate::models::cargo::{Cargo, CargoStatus};

#[derive(Clone)]
pub struct AppState {
    pub cargos: Arc<RwLock<Vec<Cargo>>>,
    pub next_id: Arc<AtomicU64>,
}

impl AppState {
    pub fn with_sample_data() -> Self {
        Self {
            cargos: Arc::new(RwLock::new(vec![
                Cargo {
                    id: 1,
                    origem: "Belém".to_string(),
                    destino: "São Paulo".to_string(),
                    peso: 1000.0,
                    volume: 20.0,
                    status: CargoStatus::InTransit,
                },
                Cargo {
                    id: 2,
                    origem: "Manaus".to_string(),
                    destino: "Brasília".to_string(),
                    peso: 500.0,
                    volume: 10.0,
                    status: CargoStatus::Delivered,
                },
            ])),
            next_id: Arc::new(AtomicU64::new(3)),
        }
    }

    pub fn take_next_id(&self) -> u64 {
        self.next_id.fetch_add(1, Ordering::Relaxed)
    }
}
