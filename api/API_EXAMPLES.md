# Exemplos de Requisições da API

## Base URL
```
http://localhost:8000/api
```

## 1. Criar Tarefa

### Requisição
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Clean Architecture",
    "description": "Ler o livro do Uncle Bob sobre Clean Architecture",
    "status": "pending"
  }'
```

### Resposta (201 Created)
```json
{
  "id": 1,
  "title": "Estudar Clean Architecture",
  "description": "Ler o livro do Uncle Bob sobre Clean Architecture",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": null,
  "completedAt": null
}
```

## 2. Listar Todas as Tarefas

### Requisição
```bash
curl http://localhost:8000/api/tasks
```

### Resposta (200 OK)
```json
[
  {
    "id": 1,
    "title": "Estudar Clean Architecture",
    "description": "Ler o livro do Uncle Bob sobre Clean Architecture",
    "status": "pending",
    "createdAt": "2024-01-01T12:00:00Z",
    "updatedAt": null,
    "completedAt": null
  },
  {
    "id": 2,
    "title": "Implementar API REST",
    "description": "Criar endpoints para gerenciamento de tarefas",
    "status": "in_progress",
    "createdAt": "2024-01-01T13:00:00Z",
    "updatedAt": "2024-01-01T14:00:00Z",
    "completedAt": null
  }
]
```

## 3. Filtrar Tarefas por Status

### Requisição (Pendentes)
```bash
curl http://localhost:8000/api/tasks?status=pending
```

### Requisição (Em Progresso)
```bash
curl http://localhost:8000/api/tasks?status=in_progress
```

### Requisição (Concluídas)
```bash
curl http://localhost:8000/api/tasks?status=completed
```

## 4. Obter Tarefa por ID

### Requisição
```bash
curl http://localhost:8000/api/tasks/1
```

### Resposta (200 OK)
```json
{
  "id": 1,
  "title": "Estudar Clean Architecture",
  "description": "Ler o livro do Uncle Bob sobre Clean Architecture",
  "status": "pending",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": null,
  "completedAt": null
}
```

### Resposta de Erro (404 Not Found)
```json
{
  "error": "Task with id 999 not found"
}
```

## 5. Atualizar Tarefa (PUT - Atualização Completa)

### Requisição
```bash
curl -X PUT http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Clean Architecture - ATUALIZADO",
    "description": "Ler o livro do Uncle Bob e fazer exercícios práticos",
    "status": "in_progress"
  }'
```

### Resposta (200 OK)
```json
{
  "id": 1,
  "title": "Estudar Clean Architecture - ATUALIZADO",
  "description": "Ler o livro do Uncle Bob e fazer exercícios práticos",
  "status": "in_progress",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T15:00:00Z",
  "completedAt": null
}
```

## 6. Atualizar Tarefa (PATCH - Atualização Parcial)

### Requisição (Apenas Status)
```bash
curl -X PATCH http://localhost:8000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### Resposta (200 OK)
```json
{
  "id": 1,
  "title": "Estudar Clean Architecture - ATUALIZADO",
  "description": "Ler o livro do Uncle Bob e fazer exercícios práticos",
  "status": "completed",
  "createdAt": "2024-01-01T12:00:00Z",
  "updatedAt": "2024-01-01T16:00:00Z",
  "completedAt": "2024-01-01T16:00:00Z"
}
```

## 7. Deletar Tarefa

### Requisição
```bash
curl -X DELETE http://localhost:8000/api/tasks/1
```

### Resposta (204 No Content)
```
(sem corpo)
```

## 8. Exemplos de Erros de Validação

### Título Vazio
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "status": "pending"
  }'
```

### Resposta (400 Bad Request)
```json
{
  "errors": "title: Title cannot be blank"
}
```

### Status Inválido
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "status": "invalid_status"
  }'
```

### Resposta (400 Bad Request)
```json
{
  "errors": "status: Status must be either 'pending' or 'in_progress'"
}
```

## 9. Exemplos com JavaScript (Fetch API)

### Criar Tarefa
```javascript
fetch('http://localhost:8000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nova tarefa',
    description: 'Descrição da tarefa',
    status: 'pending'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Listar Tarefas
```javascript
fetch('http://localhost:8000/api/tasks')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Atualizar Tarefa
```javascript
fetch('http://localhost:8000/api/tasks/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Tarefa atualizada',
    status: 'completed'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Deletar Tarefa
```javascript
fetch('http://localhost:8000/api/tasks/1', {
  method: 'DELETE'
})
.then(response => {
  if (response.status === 204) {
    console.log('Tarefa deletada com sucesso');
  }
})
.catch(error => console.error('Error:', error));
```

## 10. Exemplos com Postman

### Collection JSON para importar no Postman
```json
{
  "info": {
    "name": "TODO List API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Task",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Nova tarefa\",\n  \"description\": \"Descrição\",\n  \"status\": \"pending\"\n}"
        },
        "url": {
          "raw": "http://localhost:8000/api/tasks",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "tasks"]
        }
      }
    },
    {
      "name": "List Tasks",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:8000/api/tasks",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "tasks"]
        }
      }
    }
  ]
}
```



