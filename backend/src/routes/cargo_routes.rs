use axum::{Router, routing::get};

use sqlx::PgPool;

use crate::handlers::cargo_handler::{
    atualizar_cargo, buscar_cargo, criar_cargo, deletar_cargo, listar_cargos,
};

pub fn cargo_routes() -> Router<PgPool> {
    Router::new()
        .route("/cargos", get(listar_cargos).post(criar_cargo))
        .route(
            "/cargos/{id}",
            get(buscar_cargo).put(atualizar_cargo).delete(deletar_cargo),
        )
}
