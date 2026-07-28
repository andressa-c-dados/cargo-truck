use axum::{
    routing::{get, post},
    Router,
};

use crate::handlers::cargo_handler::{
    listar_cargos,
    buscar_cargo,
    criar_cargo,
};


pub fn cargo_routes() -> Router {

    Router::new()
    .route("/cargos", get(listar_cargos).post(criar_cargo))
    .route("/cargos/{id}", get(buscar_cargo))
}