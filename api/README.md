# TODO List API - Symfony

API RESTful para gerenciamento de tarefas (TODO List) construída com Symfony 6.4, seguindo os princípios de Clean Architecture.

## 🏗️ Arquitetura

O projeto segue Clean Architecture com as seguintes camadas:

```
src/
├── Domain/              # Camada de Domínio (Entidades, Value Objects, Interfaces)
│   ├── Entity/         # Entidades de negócio
│   ├── ValueObject/    # Value Objects
│   └── Repository/     # Interfaces de repositório
├── Application/        # Camada de Aplicação (Casos de uso, DTOs, Services)
│   ├── DTO/           # Data Transfer Objects
│   └── Service/       # Serviços de aplicação
├── Infrastructure/     # Camada de Infraestrutura (Implementações concretas)
│   └── Repository/    # Implementações de repositório (Doctrine)
└── Presentation/       # Camada de Apresentação (Controllers, API)
    └── Controller/    # Controllers REST
```

## 📋 Requisitos

- PHP 8.2+
- Composer
- MySQL 8.0+
- Symfony CLI (opcional)

## 🚀 Instalação

1. **Instalar dependências:**
```bash
composer install
```

2. **Configurar banco de dados:**
   - Edite o arquivo `.env` e configure a `DATABASE_URL`:
   ```
   DATABASE_URL="mysql://usuario:senha@127.0.0.1:3306/todo_db?serverVersion=8.0.32&charset=utf8mb4"
   ```

3. **Criar banco de dados:**
```bash
php bin/console doctrine:database:create
```

4. **Executar migrações:**
```bash
php bin/console doctrine:migrations:migrate
```

5. **Iniciar servidor:**
```bash
symfony server:start
# ou
php -S localhost:8000 -t public
```

A API estará disponível em: `http://localhost:8000`

## 📡 Endpoints da API

### Base URL
```
http://localhost:8000/api
```

### 1. Criar Tarefa
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Minha primeira tarefa",
  "description": "Descrição opcional da tarefa",
  "status": "pending"
}
```

**Status possíveis:** `pending`, `in_progress`

**Resposta (201 Created):**
```json
{
  "id": 1,
  "title": "Minha primeira tarefa",
  "description": "Descrição opcional da tarefa",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": null,
  "completedAt": null
}
```

### 2. Listar Tarefas
```http
GET /api/tasks
GET /api/tasks?status=pending
GET /api/tasks?status=in_progress
GET /api/tasks?status=completed
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Minha primeira tarefa",
    "description": "Descrição opcional da tarefa",
    "status": "pending",
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": null,
    "completedAt": null
  }
]
```

### 3. Obter Tarefa por ID
```http
GET /api/tasks/{id}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "title": "Minha primeira tarefa",
  "description": "Descrição opcional da tarefa",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": null,
  "completedAt": null
}
```

### 4. Atualizar Tarefa
```http
PUT /api/tasks/{id}
Content-Type: application/json

{
  "title": "Título atualizado",
  "description": "Nova descrição",
  "status": "completed"
}
```

**Status possíveis:** `pending`, `in_progress`, `completed`

**Resposta (200 OK):**
```json
{
  "id": 1,
  "title": "Título atualizado",
  "description": "Nova descrição",
  "status": "completed",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T13:00:00Z",
  "completedAt": "2024-01-01T13:00:00Z"
}
```

### 5. Deletar Tarefa
```http
DELETE /api/tasks/{id}
```

**Resposta (204 No Content)**

## 🎯 Status das Tarefas

- **pending**: Tarefa pendente (padrão)
- **in_progress**: Tarefa em andamento
- **completed**: Tarefa concluída (define automaticamente `completedAt`)

## ✅ Validações

- **title**: Obrigatório, 1-255 caracteres
- **description**: Opcional, máximo 1000 caracteres
- **status**: Deve ser um dos valores válidos

## 🔒 CORS

A API está configurada para aceitar requisições de qualquer origem. Para produção, ajuste em `config/packages/cors.yaml`.

## 🧪 Testando a API

### Usando cURL:

```bash
# Criar tarefa
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Nova tarefa","status":"pending"}'

# Listar tarefas
curl http://localhost:8000/api/tasks

# Obter tarefa
curl http://localhost:8000/api/tasks/1

# Atualizar tarefa
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Tarefa atualizada","status":"completed"}'

# Deletar tarefa
curl -X DELETE http://localhost:8000/api/tasks/1
```

## 📁 Estrutura de Arquivos

```
.
├── config/                 # Configurações do Symfony
│   └── packages/          # Configurações de pacotes
├── migrations/            # Migrações do Doctrine
├── public/               # Ponto de entrada público
│   └── index.php
├── src/
│   ├── Domain/           # Camada de Domínio
│   ├── Application/      # Camada de Aplicação
│   ├── Infrastructure/   # Camada de Infraestrutura
│   ├── Presentation/     # Camada de Apresentação
│   └── Kernel.php
├── composer.json
└── README.md
```

## 🎨 Princípios Aplicados

- ✅ **Clean Architecture**: Separação clara de responsabilidades
- ✅ **SOLID**: Princípios SOLID aplicados
- ✅ **DRY**: Código reutilizável
- ✅ **Dependency Inversion**: Dependências de abstrações, não implementações
- ✅ **Repository Pattern**: Abstração de acesso a dados
- ✅ **DTO Pattern**: Transferência de dados tipada
- ✅ **Value Objects**: Objetos de valor imutáveis

## 📝 Próximos Passos

1. Implementar autenticação/autorização (JWT)
2. Adicionar testes unitários e de integração
3. Implementar paginação na listagem
4. Adicionar filtros avançados
5. Implementar soft delete
6. Adicionar logging e monitoramento

## 📄 Licença

MIT



