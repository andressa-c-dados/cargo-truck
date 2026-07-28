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

A arquitetura final planejada segue o modelo:

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

Responsável pela API REST, regras de negócio e processamento das cargas.

---

## Banco de dados

Planejado:

* PostgreSQL
* SQLx

O armazenamento inicialmente foi desenvolvido em memória para validação da API, sendo posteriormente migrado para banco relacional.

---

# 📂 Estrutura do projeto

```
cargo-truck/

├── frontend/
│
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│
├── backend/
│
│   ├── src/
│   │   ├── handlers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── main.rs
│
└── README.md
```

---

# 🚀 Funcionalidades atuais

## Backend

API REST implementada com:

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

Recebe uma nova carga.

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

---

### Buscar carga

```
GET /cargos/{id}
```

Retorna uma carga específica.

---

### Atualizar carga

```
PUT /cargos/{id}
```

Atualiza informações existentes.

---

### Remover carga

```
DELETE /cargos/{id}
```

Remove uma carga cadastrada.

---

# 💻 Executando localmente

## Backend

Entre na pasta:

```bash
cd backend
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

Entre na pasta:

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

---

# 🔄 Roadmap DevOps

## ✅ Desenvolvimento da aplicação

* [x] Frontend React
* [x] API REST Rust
* [x] CRUD de cargas
* [x] Comunicação Frontend + Backend

---

## 🔄 Banco de dados

* [ ] PostgreSQL
* [ ] SQLx migrations
* [ ] Persistência definitiva

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

Projeto experimental Bootcamp Avanti.
