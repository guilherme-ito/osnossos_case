# Changelog

## [1.0.0] - 2024-01-01

### Added
- API RESTful completa para gerenciamento de tarefas (TODO List)
- CRUD completo: Create, Read, Update, Delete
- Filtro por status (pending, in_progress, completed)
- Validação de dados de entrada
- Clean Architecture implementada
- Suporte a CORS
- Migração de banco de dados
- Documentação completa da API

### Architecture
- Domain Layer: Entities, Value Objects, Repository Interfaces
- Application Layer: DTOs, Services
- Infrastructure Layer: Doctrine Repository Implementation
- Presentation Layer: REST Controllers

### Features
- Status automático de conclusão (completedAt)
- Timestamps automáticos (createdAt, updatedAt)
- Validação robusta de entrada
- Tratamento de erros adequado
- Respostas JSON padronizadas



