use axum::{
    Json,
    extract::Path,
};

use crate::models::cargo::Cargo;


pub async fn listar_cargos() -> Json<Vec<Cargo>> {

    let cargos = vec![
        Cargo {
            id: Some(1),
            origem: "Belém".to_string(),
            destino: "São Paulo".to_string(),
            peso: 1000.0,
            volume: 20.0,
            status: "Em trânsito".to_string(),
        },

        Cargo {
            id: Some(2),
            origem: "Manaus".to_string(),
            destino: "Brasília".to_string(),
            peso: 500.0,
            volume: 10.0,
            status: "Entregue".to_string(),
        },
    ];

    Json(cargos)
}



pub async fn buscar_cargo(
    Path(id): Path<u32>
) -> Json<Cargo> {

    let cargo = Cargo {

        id: Some(id),

        origem: "Belém".to_string(),

        destino: "São Paulo".to_string(),

        peso: 1000.0,

        volume: 20.0,

        status: "Em trânsito".to_string(),

    };

    Json(cargo)
}



pub async fn criar_cargo(
    Json(cargo): Json<Cargo>
) -> Json<Cargo> {

    println!(
        "Nova carga recebida: {} -> {}",
        cargo.origem,
        cargo.destino
    );

    Json(cargo)
}