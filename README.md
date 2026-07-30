# 🚛 Cargo Truck — Cloud Native Logistics Platform

## 📌 Sobre o projeto

O **Cargo Truck** é uma plataforma de gerenciamento logístico desenvolvida com foco em arquitetura moderna de software e práticas DevOps.

O objetivo do projeto é criar uma aplicação completa para gerenciamento de cargas, utilizando tecnologias atuais de desenvolvimento, integração contínua, infraestrutura como código e automação de servidores.

Além da aplicação web, o projeto tem como finalidade demonstrar um fluxo DevOps completo envolvendo:

* Desenvolvimento Full Stack;
* Containerização com Docker;
* Pipeline CI/CD;
* Provisionamento de infraestrutura com Terraform;
* Configuração automatizada com Ansible.

---

# 🎯 Objetivo

Construir uma solução logística onde usuários possam:

* Cadastrar cargas;
* Visualizar cargas cadastradas;
* Consultar detalhes;
* Atualizar informações;
* Remover cargas;
* Acompanhar o status do transporte.

O projeto também serve como demonstração prática de uma arquitetura preparada para ambientes de produção.

---

# 🏗️ Arquitetura da aplicação

```text
                 Usuário

                    │
                    ▼

             Frontend (React)

                    │
                    ▼

            API REST (Rust + Axum)

                    │
                    ▼

          PostgreSQL Database
```

Arquitetura DevOps:

```text
            GitHub Repository

                    │
                    ▼

            GitHub Actions

                    │
                    ▼

             Docker Images

                    │
                    ▼

           Deploy Automatizado

                    │
                    ▼

        Terraform + Ansible

                    │
                    ▼

            Ambiente Cloud
```

---

# 🛠️ Tecnologias utilizadas

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

Responsável pela interface do usuário e comunicação com a API.

---

## Backend

* Rust
* Axum
* Tokio
* Serde
* SQLx
* dotenvy

Responsável pela API REST, regras de negócio e processamento das cargas.

---

## Banco de dados

* PostgreSQL
* SQLx Migrations

Os dados das cargas são persistidos no PostgreSQL. As migrations são responsáveis por versionar o banco de dados e manter sua estrutura consistente entre diferentes ambientes.

---

# 📂 Estrutura do projeto

```text
cargo-truck/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│
├── backend/
│   ├── migrations/
│   ├── src/
│   │   ├── database/
│   │   ├── handlers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── main.rs
│   └── .env.example
│
├── docker/
├── terraform/
├── ansible/
├── .github/
│   └── workflows/
│
└── README.md
```

---

# 🚀 Funcionalidades atuais

## Backend

API REST com persistência em PostgreSQL.

### Listar cargas

```http
GET /cargos
```

Retorna todas as cargas cadastradas.

---

### Criar carga

```http
POST /cargos
```

Exemplo:

```json
{
  "origem": "Belém",
  "destino": "São Paulo",
  "peso": 1000,
  "volume": 20,
  "status": "in_transit"
}
```

Status disponíveis:

* `pending`
* `in_transit`
* `delivered`

---

### Buscar carga

```http
GET /cargos/{id}
```

---

### Atualizar carga

```http
PUT /cargos/{id}
```

---

### Remover carga

```http
DELETE /cargos/{id}
```

---

# 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

* Git
* Node.js (22 ou superior)
* npm
* Rust (Cargo)
* PostgreSQL
* SQLx CLI

---

# 💻 Executando o projeto

## 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd cargo-truck
```

---

## 2. Configurando o banco

Crie um arquivo `.env` dentro da pasta `backend`.

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/cargo_truck
```

Execute as migrations:

```bash
cd backend
sqlx migrate run
```

Para verificar o status das migrations:

```bash
sqlx migrate info
```

---

## 3. Executando o Backend

Entre na pasta:

```bash
cd backend
```

Compile o projeto:

```bash
cargo build
```

Execute a aplicação:

```bash
cargo run
```

API disponível em:

```
http://127.0.0.1:3000
```

---

## 4. Executando o Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Aplicação disponível em:

```
http://localhost:5173
```

Caso a API esteja em outro endereço, crie um arquivo `.env.local`:

```env
VITE_API_URL=http://127.0.0.1:3000
```

---

# 🔄 Roadmap DevOps

## ✅ Aplicação

* [x] Frontend React
* [x] Backend Rust
* [x] API REST
* [x] CRUD de cargas
* [x] Integração Frontend + Backend

---

## ✅ Banco de Dados

* [x] PostgreSQL
* [x] SQLx Migrations
* [x] Persistência dos dados

---

## 🐳 Containerização

* [ ] Dockerfile (Frontend)
* [ ] Dockerfile (Backend)
* [ ] Docker Compose
* [ ] Containers integrados

---

## ⚙️ CI/CD

* [ ] GitHub Actions
* [ ] Testes automatizados
* [ ] Build automático
* [ ] Publicação de imagens Docker
* [ ] Deploy automatizado

---

## 🏗️ Infraestrutura como Código

* [ ] Terraform
* [ ] Provisionamento da infraestrutura
* [ ] Configuração de rede
* [ ] Recursos em nuvem

---

## 🤖 Automação

* [ ] Ansible
* [ ] Configuração automática de servidores
* [ ] Instalação de dependências
* [ ] Deploy automatizado

---

# 📊 Visão DevOps

Este projeto busca aplicar princípios modernos de DevOps, como:

* Automação de processos;
* Integração Contínua (CI);
* Entrega Contínua (CD);
* Infraestrutura como Código (IaC);
* Padronização de ambientes;
* Escalabilidade;
* Reprodutibilidade;
* Preparação para ambientes de produção.

Mais do que uma aplicação logística, o Cargo Truck é um laboratório prático para demonstrar o ciclo completo de desenvolvimento, entrega e operação de software em ambientes Cloud Native.

---

# 👨‍💻 Equipe

Projeto desenvolvido para fins acadêmicos como prática de Arquitetura de Software, Cloud Computing e DevOps.

---

# 📄 Licença

Projeto desenvolvido para fins educacionais e de demonstração de práticas modernas de Engenharia de Software, DevOps e Cloud Native.
