# Expenses API

API REST para controle de despesas (Node.js + Express + Prisma + MySQL).

## Pré-requisitos

- Node.js **22.18+** (recomendado 24)
- MySQL 8 **ou** Docker

## 1. Instalação

```bash
npm install
cp .env.example .env
```

Ajuste as variáveis do `.env` se necessário (`DB_*`, `DB_URL`, `JWT_ACCESS_SECRET`).

## 2. Banco de dados

### Opção 1: com Docker

```bash
docker compose up -d
```

Sobe um MySQL 8.4 usando `DB_PASSWORD`, `DB_NAME` e `DB_PORT` do `.env`.

### Opção 2: sem Docker

Com um MySQL rodando localmente, crie o banco:

```sql
CREATE DATABASE expenses_db;
```

Ajuste os valores no `.env` para bater com o seu banco.

## 3. Migrations e seed

```bash
npx prisma generate
npm run migration:run
npm run seed
```

## 4. Iniciar a API

```bash
npm run dev
```

A API fica disponível em `http://localhost:3000/api/v1`.

Documentação Swagger: `http://localhost:3000/api/v1/docs` (OpenAPI em JSON: `/api/v1/docs.json`).

## Usuário de teste

Email: `teste@email.com`
Senha:`123456`

Login: `POST /api/v1/auth/login` com `{ "email": "teste@email.com", "password": "123456" }`. Use o token retornado no header `Authorization: Bearer <token>`.
