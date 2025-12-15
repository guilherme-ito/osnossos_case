# TODO List - Mobile App (Ionic/Angular)

Aplicativo mobile para gerenciamento de tarefas desenvolvido com Ionic e Angular.

## 🚀 Tecnologias

- **Ionic 8** - Framework mobile
- **Angular 20** - Framework web
- **TypeScript** - Linguagem
- **Capacitor** - Runtime nativo

## 📱 Funcionalidades

- ✅ Listar todas as tarefas
- ✅ Filtrar tarefas por status (Todas, Pendentes)
- ✅ Criar nova tarefa
- ✅ Editar tarefa existente
- ✅ Deletar tarefa
- ✅ Atualizar status da tarefa (pendente → em andamento → concluída)
- ✅ Pull-to-refresh para atualizar lista
- ✅ Interface responsiva e moderna

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Ionic CLI (`npm install -g @ionic/cli`)

### Passos

1. **Instalar dependências:**
```bash
cd mobile
npm install
```

2. **Configurar URL da API:**
   
   Edite `src/environments/environment.ts` e ajuste a URL da API:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api' // Ajuste se necessário
   };
   ```

   **Importante:** Para testar em dispositivo físico ou emulador Android/iOS, você precisará usar o IP da sua máquina ao invés de `localhost`. Exemplo:
   ```typescript
   apiUrl: 'http://192.168.1.100:8000/api' // IP da sua máquina na rede local
   ```

3. **Executar o app:**
```bash
ionic serve
```

O app estará disponível em: `http://localhost:8100`

## 📱 Executar em Dispositivo

### Android

```bash
# Adicionar plataforma Android
ionic capacitor add android

# Build e abrir no Android Studio
ionic capacitor open android

# Ou build e copiar para dispositivo
ionic capacitor build android
```

### iOS

```bash
# Adicionar plataforma iOS
ionic capacitor add ios

# Build e abrir no Xcode
ionic capacitor open ios
```

## 🏗️ Estrutura do Projeto

```
mobile/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── task.model.ts          # Interfaces TypeScript
│   │   ├── services/
│   │   │   └── task.service.ts        # Serviço HTTP para API
│   │   ├── tasks/
│   │   │   ├── tasks.page.ts          # Página de listagem
│   │   │   ├── tasks.page.html
│   │   │   └── tasks.page.scss
│   │   ├── task-form/
│   │   │   ├── task-form.page.ts      # Página de criar/editar
│   │   │   ├── task-form.page.html
│   │   │   └── task-form.page.scss
│   │   └── app.routes.ts              # Rotas
│   ├── environments/
│   │   ├── environment.ts             # Configuração dev
│   │   └── environment.prod.ts        # Configuração prod
│   └── main.ts                         # Bootstrap
```

## 🔌 Integração com API

O app consome a API REST localizada em `http://localhost:8000/api` (configurável em `environment.ts`).

### Endpoints Utilizados

- `GET /api/tasks` - Listar todas as tarefas
- `GET /api/tasks?status={status}` - Filtrar por status
- `GET /api/tasks/{id}` - Obter tarefa por ID
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/{id}` - Atualizar tarefa
- `DELETE /api/tasks/{id}` - Deletar tarefa

## 🎨 Interface

- **Lista de Tarefas:** Exibe todas as tarefas com status colorido
- **Filtros:** Botões para filtrar por status
- **Ações Rápidas:** Botões para editar, deletar e marcar como concluída
- **Pull-to-Refresh:** Arraste para baixo para atualizar
- **FAB:** Botão flutuante para criar nova tarefa
- **Formulário:** Validação em tempo real

## 🐛 Troubleshooting

### Erro de CORS

Se você encontrar erros de CORS ao testar, certifique-se de que:
1. A API está rodando
2. A URL no `environment.ts` está correta
3. Para dispositivos físicos, use o IP da máquina ao invés de `localhost`

### Erro de Conexão

- Verifique se a API está rodando: `http://localhost:8000/api/tasks`
- Teste a conexão no navegador primeiro
- Para Android/iOS, use o IP da sua máquina na rede local

## 📝 Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar notificações push
- [ ] Adicionar sincronização offline
- [ ] Melhorar tratamento de erros
- [ ] Adicionar animações

## 📄 Licença

MIT


