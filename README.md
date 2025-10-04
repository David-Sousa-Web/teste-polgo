# 🎯 Polgo - Sistema de Promoções

Sistema completo de gerenciamento de promoções com backend Node.js, frontend Vue.js e MongoDB.

## 🌐 Aplicação em Produção

A aplicação está disponível online e pode ser acessada através dos seguintes links:

- **🎨 Frontend (Aplicação Web)**: [https://testepolgo.dev](https://testepolgo.dev)
- **🔧 API Backend**: [https://testepolgo.dev/api](https://testepolgo.dev/api)

> 💡 A aplicação está hospedada na Digital Ocean utilizando Docker e possui deploy automatizado via GitHub Actions.

---

## 📋 Índice

- [Executando Localmente (com Docker)](#-executando-localmente-com-docker)
- [Executando sem Docker](#-executando-sem-docker)
- [Tecnologias](#-tecnologias)

---

## 🚀 Executando Localmente com Docker (recomendado)

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) (v20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)

### 1. Clone o repositório

```bash
git clone https://github.com/David-Sousa-Web/teste-polgo.git
cd teste-polgo
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto podendo copiar o arquivo `.env.example` e preencher as variáveis de ambiente.

na pasta backend crie um arquivo `.env` podendo copiar o arquivo `.env.example` e preencher as variáveis de ambiente.

### 3. Inicie os containers

```bash
docker compose up -d --build
```

Este comando irá:
- 🗄️ Criar o banco MongoDB com replica set
- 🔧 Configurar o backend (Node.js + Prisma)
- 🎨 Configurar o frontend (Vue.js + Nginx)
- 📊 Executar as seeds do banco de dados

### 4. Aguarde os containers iniciarem

Acompanhe os logs:

```bash
docker compose logs -f
```

Aguarde até ver:
- `mongo` - Replica set configurado
- `backend` - Server listening on port 3333
- `frontend` - Nginx pronto

### 5. Acesse a aplicação

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3333/api
- **📚 Documentação da API (Swagger)**: http://localhost:3333/api/docs

> ⚠️ **Nota**: A documentação Swagger está disponível apenas em ambiente local de desenvolvimento.

---

## 🔧 Executando sem Docker

Se você não possui Docker instalado, pode executar o projeto diretamente na sua máquina.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v20+)
- [MongoDB](https://www.mongodb.com/try/download/community) (v7.0+)

### 1. Clone o repositório

```bash
git clone https://github.com/David-Sousa-Web/teste-polgo.git
cd teste-polgo
```

### 2. Configure o MongoDB com Replica Set

O Prisma requer que o MongoDB esteja configurado como Replica Set. Execute:

```bash
# Inicie o MongoDB com replica set
mongod --replSet rs0 --port 27017 --dbpath /data/db

# Em outro terminal, inicialize o replica set
mongosh
> rs.initiate()
> exit
```

### 3. Configure o Backend

```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente na pasta backend copiando o arquivo .env.example e preenchendo as variáveis de ambiente.

# Execute as migrações do Prisma
npx prisma db push

# Execute as seeds
npm run seed

# Inicie o backend
npm run dev
```

O backend estará rodando em `http://localhost:3333`

### 4. Configure o Frontend

Em outro terminal:

```bash
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

### 5. Acesse a aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3333/api
- **📚 Documentação da API (Swagger)**: http://localhost:3333/api/docs

### Comandos Úteis

**Backend:**
```bash
cd backend

# Rodar todos os testes
npm test

# Rodar testes em modo watch (auto-reload)
npm run test:watch

# Rodar testes com cobertura
npm run test:coverage

# Compilar TypeScript para produção
npm run build

# Iniciar servidor de produção
npm run start

# Executar seeds novamente
npm run seed
```

**Frontend:**
```bash
cd frontend

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Verificar erros de lint
npm run lint
```

---

## 🛠️ Tecnologias

### Backend
- **Node.js** 20 + TypeScript
- **Express** - Framework web
- **Prisma** - ORM para MongoDB
- **JWT** - Autenticação
- **Zod** - Validação de schemas

### Frontend
- **Vue 3** - Framework progressivo
- **Vue Router** - Roteamento
- **Axios** - Cliente HTTP
- **TailwindCSS** - Estilização
- **Vite** - Build tool

### Banco de Dados
- **MongoDB 7.0** com Replica Set

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração local
- **Nginx** - Reverse proxy e servidor estático

---

