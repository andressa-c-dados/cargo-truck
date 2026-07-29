mod database;
mod handlers;
mod models;
mod routes;
use dotenvy::dotenv;
use database::connection::connect;

use axum::{
    Router,
    http::{HeaderValue, Method, header},
    routing::get,
};

use tower_http::cors::CorsLayer;

use routes::cargo_routes::cargo_routes;

#[tokio::main]
async fn main() {
    dotenv().ok();


    let pool = connect().await;

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers([header::CONTENT_TYPE]);

    let app = Router::new()
        .route("/", get(home))
        .merge(cargo_routes())
        .layer(cors)
        .with_state(pool);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    println!("Servidor rodando na porta 3000");

    axum::serve(listener, app).await.unwrap();
}

async fn home() -> &'static str {
    "Cargo Truck API 🚛"
}
