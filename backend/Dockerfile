# Stage 1: Build
FROM rust:1.80-slim-bullseye AS builder

WORKDIR /usr/src/app

# Instalar dependências necessárias para o build
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations

# Compilar em modo release
RUN cargo build --release

# Stage 2: Runtime
FROM debian:bullseye-slim

WORKDIR /usr/local/bin

# Instalar dependências de runtime (ssl)
RUN apt-get update && apt-get install -y libssl1.1 ca-certificates && rm -rf /var/lib/apt/lists/*

# Copiar o binário compilado
COPY --from=builder /usr/src/app/target/release/backend ./backend

# Copiar migrations
COPY --from=builder /usr/src/app/migrations ./migrations

EXPOSE 3000

# Executar aplicação
CMD ["./backend"]
