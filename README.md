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
* Acompanhar status de transporte.

O projeto também serve como demonstração prática de uma arquitetura preparada para ambientes de produção.

---

# 🏗️ Arquitetura da aplicação

```
                 Usuário

                    |
                    v

              Frontend React

                    |
                    v

              API Rust Axum

                    |
                    v

             PostgreSQL Database
```

Com infraestrutura DevOps:

```
              GitHub Repository

                    |

              GitHub Actions

                    |

             Docker Images

                    |

              Deploy automático

                    |

        Terraform + Ansible

                    |

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
* SQLx migrations

Os dados de cargas são persistidos em PostgreSQL. As migrations definem a tabela `cargos` e o enum `cargo_status`.

---

# 📂 Estrutura do projeto

```
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
│   └── .env
│
└── README.md
```

---

# 🚀 Funcionalidades atuais

## Backend

API REST implementada com persistência no PostgreSQL:

### Listar cargas

```
GET /cargos
```

Retorna todas as cargas cadastradas.

---

### Criar carga

```
POST /cargos
```

Recebe uma nova carga e retorna `201 Created`.

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

Status aceitos: `pending`, `in_transit` e `delivered`.

---

### Buscar carga

```
GET /cargos/{id}
```

Retorna uma carga específica ou `404 Not Found`.

---

### Atualizar carga

```
PUT /cargos/{id}
```

Atualiza informações existentes ou retorna `404 Not Found`.

---

### Remover carga

```
DELETE /cargos/{id}
```

Remove uma carga cadastrada e retorna `204 No Content`.

---

# 💻 Executando localmente

## Banco de dados

Crie `backend/.env` com a conexão do PostgreSQL:

```env
DATABASE_URL=postgres://USUARIO:SENHA@localhost:5432/cargo_truck
```

No WSL, aplique as migrations antes de iniciar a API:

```bash
cd /mnt/c/Users/andre/OneDrive/Desktop/Projetos/cargo-truck/backend
sqlx migrate run
```

Verifique o estado com:

```bash
sqlx migrate info
```

---

## Backend

No WSL, entre na pasta:

```bash
cd /mnt/c/Users/andre/OneDrive/Desktop/Projetos/cargo-truck/backend
```

Execute:

```bash
cargo run
```

Servidor:

```
http://127.0.0.1:3000
```

---

## Frontend

Em outro terminal, entre na pasta:

```bash
cd frontend
```

Instale dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Aplicação:

```
http://localhost:5173
```

O frontend usa `http://127.0.0.1:3000` como API por padrão. Para configurar outra URL, crie `frontend/.env.local`:

```env
VITE_API_URL=http://127.0.0.1:3000
```

---

# 🔄 Roadmap DevOps

## ✅ Desenvolvimento da aplicação

* [x] Frontend React
* [x] API REST Rust
* [x] CRUD de cargas
* [x] Comunicação Frontend + Backend

---

## ✅ Banco de dados

* [x] PostgreSQL
* [x] SQLx migrations
* [x] Persistência definitiva

---

## 🐳 Containerização

* [ ] Dockerfile Frontend
* [ ] Dockerfile Backend
* [ ] Docker Compose
* [ ] Containers integrados

---

## ⚙️ CI/CD

Implementação planejada:

* [ ] GitHub Actions
* [ ] Testes automáticos
* [ ] Build automático
* [ ] Publicação de imagens Docker
* [ ] Deploy automático

---

## 🏗️ Infraestrutura como código

Com Terraform:

* [ ] Provisionamento de servidores
* [ ] Configuração de rede
* [ ] Recursos de cloud

---

## 🤖 Automação

Com Ansible:

* [ ] Instalação automática de dependências
* [ ] Configuração de servidores
* [ ] Deploy automatizado

---

# 📊 Visão DevOps

O Cargo Truck busca aplicar os princípios:

* Automação;
* Entrega contínua;
* Infraestrutura reproduzível;
* Monitoramento;
* Padronização de ambientes.

O objetivo não é apenas criar uma aplicação funcional, mas demonstrar todo o ciclo de vida de um software moderno.

---

# 👨‍💻 Equipe

Projeto desenvolvido como aplicação prática de:

---

# 📄 Licença

Projeto desenvolvido como aplicação prática educacional no Bootcamp Avanti.

Uso destinado para fins acadêmicos e de demonstração de arquitetura de software, DevOps e Cloud Native.