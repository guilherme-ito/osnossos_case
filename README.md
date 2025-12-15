# TODO List - Case OSNOSSOS

Sistema completo de gerenciamento de tarefas (TODO List) composto por três aplicações independentes que compartilham a mesma API backend.

## 📁 Estrutura do Projeto

```
osnossos_case/
├── api/          # Tarefa 2: API REST Symfony + Doctrine + MySQL
├── mobile/       # Tarefa 1: App Mobile Ionic/Angular
└── web/          # Tarefa 3: Site Web Next.js + Prisma + Shadcn
```

## 🎯 Tarefas do Case

### ✅ Tarefa 2: API Symfony (COMPLETA)
- **Tecnologias**: Symfony 6.4, Doctrine ORM, MySQL
- **Arquitetura**: Clean Architecture
- **Status**: ✅ Implementada e testada
- **Documentação**: Ver [api/README.md](api/README.md)

### ✅ Tarefa 1: App Mobile (COMPLETA)
- **Tecnologias**: Ionic, Angular
- **Status**: ✅ Implementada e testada
- **Documentação**: Ver [mobile/README.md](mobile/README.md)

### ✅ Tarefa 3: Site Web (COMPLETA)
- **Tecnologias**: Next.js, Prisma, Shadcn UI
- **Status**: ✅ Implementada e testada
- **Documentação**: Ver [web/README.md](web/README.md)

## 🚀 Como Inicializar as Aplicações

### Pré-requisitos
- **PHP 8.2+** e **Composer** (para backend)
- **MySQL 8.0+** (para banco de dados)
- **Node.js 18+** (para mobile e web)
- **npm** ou **yarn** (para mobile e web)

---

### 1. Backend (API Symfony)

```bash
# Navegar para o diretório da API
cd api

# Instalar dependências PHP
composer install

# Configurar banco de dados no arquivo .env
# Edite o arquivo .env e configure:
# DATABASE_URL="mysql://usuario:senha@127.0.0.1:3306/todo_db?serverVersion=8.0.32&charset=utf8mb4"

# Criar banco de dados
php bin/console doctrine:database:create

# Executar migrações
php bin/console doctrine:migrations:migrate

# Iniciar servidor de desenvolvimento
php -S localhost:8000 -t public
```

**API disponível em:** `http://localhost:8000/api`

---

### 2. Web (Next.js)

```bash
# Navegar para o diretório web
cd web

# Instalar dependências Node.js
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

**Aplicação web disponível em:** `http://localhost:3000`

---

### 3. Mobile (Ionic/Angular)

```bash
# Navegar para o diretório mobile
cd mobile

# Instalar dependências Node.js
npm install

# Iniciar servidor de desenvolvimento
ionic serve
```

**Aplicação mobile disponível em:** `http://localhost:8100`

---

### ⚠️ Ordem Recomendada de Inicialização

1. **Primeiro:** Inicie o **Backend (API)** - as aplicações web e mobile dependem da API
2. **Segundo:** Inicie a **Web** ou **Mobile** (podem ser iniciadas em paralelo)

## 📡 Endpoints da API

### Base URL
```
http://localhost:8000/api
```

### Endpoints Disponíveis

- `POST /api/tasks` - Criar tarefa
- `GET /api/tasks` - Listar todas (com filtro opcional `?status=`)
- `GET /api/tasks/{id}` - Obter tarefa por ID
- `PUT /api/tasks/{id}` - Atualizar tarefa (completo)
- `PATCH /api/tasks/{id}` - Atualizar tarefa (parcial)
- `DELETE /api/tasks/{id}` - Deletar tarefa

### Status das Tarefas
- `pending` - Pendente
- `in_progress` - Em andamento
- `completed` - Concluída

## 🏗️ Arquitetura

### API 
```
api/
├── src/
│   ├── Domain/          # Entidades, Value Objects, Interfaces
│   ├── Application/     # DTOs, Services (Casos de uso)
│   ├── Infrastructure/  # Repositórios (Doctrine)
│   └── Presentation/    # Controllers REST
```

## 📝 Documentação

- [API - README](api/README.md) - Documentação completa da API
- [API - Exemplos](api/API_EXAMPLES.md) - Exemplos de requisições

## 🧪 Testes

A API foi testada e validada com todos os endpoints funcionando corretamente:
- ✅ CRUD completo
- ✅ Validações
- ✅ Filtros por status
- ✅ Tratamento de erros
- ✅ Timestamps automáticos

## 📄 Licença

MIT

## 👥 Contribuição

Este é um projeto de case técnico para OSNOSSOS.
