CREATE TYPE cargo_status AS ENUM (
    'pending',
    'in_transit',
    'delivered'
);

CREATE TABLE cargos (
    id BIGSERIAL PRIMARY KEY,
    origem TEXT NOT NULL,
    destino TEXT NOT NULL,
    peso DOUBLE PRECISION NOT NULL CHECK (peso > 0),
    volume DOUBLE PRECISION NOT NULL CHECK (volume > 0),
    status TEXT NOT NULL CHECK (
        status IN ('pending', 'in_transit', 'delivered')
    ),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);