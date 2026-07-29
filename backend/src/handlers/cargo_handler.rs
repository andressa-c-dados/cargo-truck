use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;
use sqlx::PgPool;

use crate::models::cargo::{Cargo, CargoInput};

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
        return Err(ApiError::bad_request("Peso deve ser maior que zero."));
    }

    if !input.volume.is_finite() || input.volume <= 0.0 {
        return Err(ApiError::bad_request("Volume deve ser maior que zero."));
    }

    Ok(())
}

// GET /cargos
pub async fn listar_cargos(State(pool): State<PgPool>) -> Result<Json<Vec<Cargo>>, ApiError> {
    let cargos = sqlx::query_as!(
        Cargo,
        r#"
        SELECT
            id,
            origem,
            destino,
            peso,
            volume,
            status as "status: _"
        FROM cargos
        ORDER BY id
        "#
    )
    .fetch_all(&pool)
    .await
    .map_err(|_| ApiError::bad_request("Erro ao buscar cargas."))?;

    Ok(Json(cargos))
}

// GET /cargos/:id
pub async fn buscar_cargo(
    State(pool): State<PgPool>,
    Path(id): Path<i64>,
) -> Result<Json<Cargo>, ApiError> {
    let cargo = sqlx::query_as!(
        Cargo,
        r#"
        SELECT
            id,
            origem,
            destino,
            peso,
            volume,
            status as "status: _"
        FROM cargos
        WHERE id = $1
        "#,
        id
    )
    .fetch_optional(&pool)
    .await
    .map_err(|_| ApiError::bad_request("Erro ao buscar carga."))?;

    cargo.map(Json).ok_or_else(ApiError::not_found)
}

// POST /cargos
pub async fn criar_cargo(
    State(pool): State<PgPool>,
    Json(input): Json<CargoInput>,
) -> Result<(StatusCode, Json<Cargo>), ApiError> {
    validate(&input)?;

    let cargo = sqlx::query_as!(
        Cargo,
        r#"
        INSERT INTO cargos
        (
            origem,
            destino,
            peso,
            volume,
            status
        )
        VALUES
        ($1,$2,$3,$4,$5)
        RETURNING
            id,
            origem,
            destino,
            peso,
            volume,
            status as "status: _"
        "#,
        input.origem.trim(),
        input.destino.trim(),
        input.peso,
        input.volume,
        input.status as _
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| ApiError::bad_request("Erro ao criar carga."))?;

    Ok((StatusCode::CREATED, Json(cargo)))
}

// PUT /cargos/:id
pub async fn atualizar_cargo(
    State(pool): State<PgPool>,
    Path(id): Path<i64>,
    Json(input): Json<CargoInput>,
) -> Result<Json<Cargo>, ApiError> {
    validate(&input)?;

    let cargo = sqlx::query_as!(
        Cargo,
        r#"
        UPDATE cargos
        SET
            origem = $1,
            destino = $2,
            peso = $3,
            volume = $4,
            status = $5
        WHERE id = $6
        RETURNING
            id,
            origem,
            destino,
            peso,
            volume,
            status as "status: _"
        "#,
        input.origem.trim(),
        input.destino.trim(),
        input.peso,
        input.volume,
        input.status as _,
        id
    )
    .fetch_optional(&pool)
    .await
    .map_err(|_| ApiError::bad_request("Erro ao atualizar carga."))?;

    cargo.map(Json).ok_or_else(ApiError::not_found)
}

// DELETE /cargos/:id
pub async fn deletar_cargo(
    State(pool): State<PgPool>,
    Path(id): Path<i64>,
) -> Result<StatusCode, ApiError> {
    let result = sqlx::query!(
        r#"
        DELETE FROM cargos
        WHERE id = $1
        "#,
        id
    )
    .execute(&pool)
    .await
    .map_err(|_| ApiError::bad_request("Erro ao deletar carga."))?;

    if result.rows_affected() == 0 {
        return Err(ApiError::not_found());
    }

    Ok(StatusCode::NO_CONTENT)
}
