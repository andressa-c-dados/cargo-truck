mod models;
mod handlers;
mod routes;

use tower_http::cors::CorsLayer;

use axum::{
    routing::get,
    Router,
};

use routes::cargo_routes::cargo_routes;


#[tokio::main]
async fn main() {

    let cors = CorsLayer::permissive();

let app = Router::new()
    .route("/", get(home))
    .merge(cargo_routes())
    .layer(cors);

    let listener = tokio::net::TcpListener::bind(
        "127.0.0.1:3000"
    )
    .await
    .unwrap();


    println!("Servidor rodando na porta 3000");


    axum::serve(listener, app)
        .await
        .unwrap();
}


async fn home() -> &'static str {
    "Cargo Truck API 🚛"
}