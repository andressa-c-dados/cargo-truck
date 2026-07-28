use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

use crate::{
    models::cargo::{Cargo, CargoInput},
    state::AppState,
};

#[derive(Serialize)]
struct ErrorBody {
    error: String,
}

pub struct ApiError {
    status: StatusCode,
    message: String,
}

impl ApiError {
    fn bad_request(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::BAD_REQUEST,
            message: message.into(),
        }
    }

    fn not_found() -> Self {
        Self {
            status: StatusCode::NOT_FOUND,
            message: "Carga não encontrada.".to_string(),
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        (
            self.status,
            Json(ErrorBody {
                error: self.message,
            }),
        )
            .into_response()
    }
}

fn validate(input: &CargoInput) -> Result<(), ApiError> {
    if input.origem.trim().is_empty() || input.destino.trim().is_empty() {
        return Err(ApiError::bad_request("Origem e destino são obrigatórios."));
    }
    if !input.peso.is_finite() || input.peso <= 0.0 {
        return Err(ApiError::bad_request(
            "Peso deve ser um número maior que zero.",
        ));
    }
    if !input.volume.is_finite() || input.volume <= 0.0 {
        return Err(ApiError::bad_request(
            "Volume deve ser um número maior que zero.",
        ));
    }
    Ok(())
}

pub async fn listar_cargos(State(state): State<AppState>) -> Json<Vec<Cargo>> {
    Json(state.cargos.read().await.clone())
}

pub async fn buscar_cargo(
    State(state): State<AppState>,
    Path(id): Path<u64>,
) -> Result<Json<Cargo>, ApiError> {
    state
        .cargos
        .read()
        .await
        .iter()
        .find(|cargo| cargo.id == id)
        .cloned()
        .map(Json)
        .ok_or_else(ApiError::not_found)
}

pub async fn criar_cargo(
    State(state): State<AppState>,
    Json(input): Json<CargoInput>,
) -> Result<(StatusCode, Json<Cargo>), ApiError> {
    validate(&input)?;
    let cargo = Cargo {
        id: state.take_next_id(),
        origem: input.origem.trim().to_string(),
        destino: input.destino.trim().to_string(),
        peso: input.peso,
        volume: input.volume,
        status: input.status,
    };
    state.cargos.write().await.push(cargo.clone());
    Ok((StatusCode::CREATED, Json(cargo)))
}

pub async fn atualizar_cargo(
    State(state): State<AppState>,
    Path(id): Path<u64>,
    Json(input): Json<CargoInput>,
) -> Result<Json<Cargo>, ApiError> {
    validate(&input)?;
    let mut cargos = state.cargos.write().await;
    let cargo = cargos
        .iter_mut()
        .find(|cargo| cargo.id == id)
        .ok_or_else(ApiError::not_found)?;
    cargo.origem = input.origem.trim().to_string();
    cargo.destino = input.destino.trim().to_string();
    cargo.peso = input.peso;
    cargo.volume = input.volume;
    cargo.status = input.status;
    Ok(Json(cargo.clone()))
}

pub async fn deletar_cargo(
    State(state): State<AppState>,
    Path(id): Path<u64>,
) -> Result<StatusCode, ApiError> {
    let mut cargos = state.cargos.write().await;
    let index = cargos
        .iter()
        .position(|cargo| cargo.id == id)
        .ok_or_else(ApiError::not_found)?;
    cargos.remove(index);
    Ok(StatusCode::NO_CONTENT)
}
