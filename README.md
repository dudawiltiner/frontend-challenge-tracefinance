# 📚 Documentação do Projeto - Trace Finance Challenge

Este documento contém informações detalhadas sobre instalação, execução, testes e decisões técnicas do projeto. O desenvolvimento foi feito com auxílio de IA Cursor para ganho de agilidade e padronização, a partir de um template que eu mesma desenvolvi do zero sobre as ferramentas principais que não poderiam faltar.

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js**: Versão 20.18.1 ou superior (recomendado: 20.x)
- **npm**: Gerenciador de pacotes
- **Git**: Para clonar o repositório

### Passos para Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositório>
   cd trace-finance-challenge
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://fe-challenge-trace-api-production.up.railway.app
   ```

4. **Configure o Husky (git hooks):**

   O Husky é configurado automaticamente através do script `prepare` no `package.json` quando você executa `npm install`. Se precisar configurar manualmente:

   **Opção 1 - Automática (recomendada):**

   ```bash
   npm install
   # O Husky será configurado automaticamente via script "prepare"
   ```

   **Opção 2 - Manual:**

   ```bash
   npx husky init
   ```

   **Opção 3 - Se já tiver a pasta .husky:**

   ```bash
   npx husky install
   ```

---

## ▶️ Como Rodar o Projeto

### Modo Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

### Build de Produção

```bash
# Gerar build
npm run build

# Rodar em produção
npm start
```

### Outros Comandos Úteis

```bash
# Verificar tipos TypeScript
npm run check-types

# Verificar formatação
npm run check-format

# Formatar código
npm run format

# Verificar lint
npm run check-lint
```

### Commits Convencionais (Commitizen)

O projeto utiliza **Commitizen** com o padrão **Conventional Commits** para garantir commits padronizados e um histórico limpo.

**Como usar:**

```bash
npm run commit
```

Este comando abre um prompt interativo que guia você através da criação de um commit seguindo o padrão Conventional Commits:

1. **Tipo de mudança**: Escolha entre `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, etc.
2. **Escopo** (opcional): Módulo ou componente afetado (ex: `transactions`, `components`, `hooks`)
3. **Descrição curta**: Breve descrição da mudança
4. **Descrição longa** (opcional): Detalhes adicionais
5. **Breaking changes** (opcional): Se a mudança quebra compatibilidade
6. **Issues afetadas** (opcional): Números de issues relacionadas

**Exemplo de commit gerado:**

```
feat(transactions): adiciona filtro por data

Implementa filtro de data na listagem de transações com suporte a range de datas e filtros rápidos (hoje, semana, mês).

Closes #123
```

**Validação automática:**

O projeto utiliza **Commitlint** configurado via Husky para validar automaticamente as mensagens de commit no hook `commit-msg`. As regras configuradas são:

- Escopo deve ter no mínimo 4 caracteres
- Escopo deve estar em UPPER CASE
- Seguir padrão Conventional Commits

**Benefícios:**

- Histórico de commits organizado e legível
- Geração automática de changelog
- Facilita identificação de breaking changes
- Melhor rastreabilidade de mudanças

---

## 🧪 Como Rodar os Testes

### Testes Unitários (Jest)

```bash
# Executar todos os testes
npm test

# Modo watch (re-executa ao salvar arquivos)
npm run test:watch

# Com cobertura de código
npm run test:coverage
```

### Testes de Componentes (Cypress)

```bash
# Abrir interface gráfica do Cypress
npm run cy:open

# Executar testes de componentes
npm run cy:run:component
```

---

## 🏗 Principais Decisões Técnicas

### 1. **Framework: Next.js 15 com App Router**

**Escolha:** Next.js 15.3.6 com App Router (não Pages Router)

**Justificativa:**

- **App Router** oferece melhor suporte a Server Components, layouts aninhados e streaming
- **Next.js 15** traz melhorias de performance e suporte nativo a React 19
- **Turbopack** (usado no dev mode) oferece build times significativamente mais rápidos
- Suporte nativo a internacionalização com `next-intl`
- Roteamento baseado em arquivos facilita organização e manutenção

**Benefícios:**

- Melhor performance com Server Components
- SEO otimizado com SSR/SSG
- Code splitting automático
- Otimização de imagens e assets

---

### 2. **Linguagem: TypeScript**

**Escolha:** TypeScript 5.3.3 com configuração estrita

**Justificativa:**

- Type safety em tempo de compilação reduz bugs em produção
- Melhor experiência de desenvolvimento com autocomplete e IntelliSense
- Facilita refatoração e manutenção de código
- Documentação implícita através de tipos
- Path aliases configurados (`@/`, `@components/`, `@hooks/`, etc.) para imports mais limpos

**Configurações importantes:**

- `strict: true` para máxima segurança de tipos
- Path aliases para melhor organização
- Tipos compartilhados em `src/types/`

---

### 3. **Gerenciamento de Estado: React Query + Hooks Locais**

**Escolha:** TanStack React Query 5.74.4 para estado de servidor + React hooks locais para estado de UI

**Justificativa:**

- **React Query**: Gerenciamento automático de estado de servidor (cache, loading, error, refetch)
- **Hooks Locais**: Para estado de UI simples (tema, formulários), utilizamos `useState` e `useContext` quando necessário
- **Sem necessidade de Zustand/Redux**: O projeto não requer estado global complexo, apenas estado de servidor e estado local de componentes

**Uso no projeto:**

- **Estado de servidor**: React Query gerencia cache, loading states e sincronização de dados da API
- **Estado de UI**: Hooks locais (`useState`) para estado de componentes (tema, formulários, filtros)
- **Estado de formulários**: React Hook Form gerencia estado interno dos formulários

**Benefícios:**

- Menor bundle size (sem biblioteca de estado global adicional)
- Estado de servidor gerenciado automaticamente
- Estado de UI simples e direto com hooks nativos do React

---

### 4. **Formulários: React Hook Form + Zod**

**Escolha:** React Hook Form 7.52.0 + Zod 3.24.3

**Justificativa:**

- **React Hook Form**: Performance superior (menos re-renders), validação controlada pelo desenvolvedor
- **Zod**: Schema validation type-safe, inferência automática de tipos TypeScript
- **Integração**: `@hookform/resolvers` conecta Zod ao RHF perfeitamente
- Validação no cliente e possibilidade de reutilizar schemas no servidor

**Benefícios:**

- Validação declarativa e type-safe
- Mensagens de erro customizáveis
- Validação em tempo real sem impacto na performance
- Schemas reutilizáveis entre frontend e backend

---

### 5. **HTTP Client: Axios + React Query**

**Escolha:** Axios 1.7.9 + TanStack React Query 5.74.4

**Justificativa:**

- **Axios**: Interceptors para tratamento global de erros, cancelamento de requisições, melhor tratamento de erros HTTP
- **React Query**: Cache inteligente, refetch automático, estados de loading/error/success, infinite scroll nativo
- **Proxy API Route**: Criamos uma rota proxy (`/api/proxy/[...path]`) para evitar problemas de CORS e centralizar tratamento de erros

**Arquitetura:**

```
Frontend → Axios → Next.js API Proxy → API Externa
                ↓
         React Query (cache, estados)
```

**Benefícios:**

- Cache automático de requisições
- Estados de loading/error gerenciados automaticamente
- Infinite scroll com `useInfiniteQuery`
- Retry automático em caso de falha
- Deduplicação de requisições

---

### 6. **Estilização: Tailwind CSS**

**Escolha:** Tailwind CSS 3.4.17 com design tokens customizados

**Justificativa:**

- **Utility-first**: Desenvolvimento rápido sem criar componentes CSS customizados para cada caso
- **Design Tokens**: Sistema de cores, espaçamentos e tipografia centralizado em `src/design-tokens/`
- **Dark Mode**: Suporte nativo com classe `dark:`
- **Performance**: Purge automático de CSS não utilizado em produção
- **Responsividade**: Breakpoints mobile-first integrados

**Design System:**

- Tokens de cores seguindo padrão da Trace Finance
- Variáveis CSS para dark mode
- Componentes base (Button, Input, Badge) seguindo Atomic Design

---

### 7. **Testes: Jest + Testing Library + Cypress**

**Escolha:** Jest 29.7.0 + Testing Library 16.1.0 + Cypress 14.3.1

**Justificativa:**

- **Jest**: Framework de testes padrão do ecossistema React, rápido e confiável
- **Testing Library**: Foco em testes orientados ao usuário (não detalhes de implementação)
- **Cypress Component Testing**: Testes de componentes isolados com visualização em tempo real

**Estratégia de Testes:**

- **Unitários (Jest)**: Funções utilitárias, hooks customizados, helpers
- **Componentes (Cypress)**: Componentes isolados com interações do usuário
- **Integração**: Testes E2E podem ser adicionados futuramente

---

### 8. **Internacionalização: next-intl**

**Escolha:** next-intl 4.6.0

**Justificativa:**

- Integração nativa com Next.js App Router
- Suporte a rotas localizadas (`/pt/transactions`, `/en/transactions`)
- Type-safe com TypeScript
- Lazy loading de traduções
- Formatação de datas, números e moedas

**Implementação:**

- Suporte a PT-BR e EN-US
- Traduções organizadas por feature
- Middleware para detecção automática de locale

---

### 9. **Arquitetura: Atomic Design + Feature-Based**

**Escolha:** Combinação de Atomic Design para componentes e Feature-Based para organização

**Estrutura:**

```
src/
├── components/
│   ├── atoms/          # Componentes básicos (Button, Input, Badge)
│   ├── molecules/      # Componentes compostos (DatePicker, FilterPanel)
│   └── organisms/      # Componentes complexos (TransactionsList, Form)
├── screens/            # Páginas/Views
├── hooks/              # Custom hooks organizados por feature
├── services/           # Camada de API
├── utils/              # Funções utilitárias
└── types/              # Tipos TypeScript compartilhados
```

**Justificativa:**

- **Atomic Design**: Facilita reutilização e manutenção de componentes
- **Feature-Based**: Organização por funcionalidade facilita navegação
- **Separação de responsabilidades**: Cada camada tem propósito claro
- **Escalabilidade**: Fácil adicionar novas features sem poluir estrutura existente

---

### 10. **Qualidade de Código: ESLint + Prettier + Husky**

**Escolha:** ESLint 8.57.1 + Prettier 3.2.5 + Husky 9.0.11 + Commitlint

**Justificativa:**

- **ESLint**: Regras TypeScript, Next.js e SonarJS para qualidade
- **Prettier**: Formatação consistente automática
- **Husky**: Git hooks para garantir qualidade antes do commit
- **Commitlint**: Validação de mensagens de commit seguindo Conventional Commits
- **Commitizen**: Ferramenta interativa para criar commits padronizados (`npm run commit`)

**Hooks configurados:**

- `pre-commit`: Lint e formatação automática
- `pre-push`: Verificação de tipos e testes
- `commit-msg`: Validação de mensagens de commit (Commitlint)

**Commitizen:**

O projeto utiliza **Commitizen** com `cz-conventional-changelog` para facilitar a criação de commits seguindo o padrão Conventional Commits. Use `npm run commit` para criar commits de forma interativa e padronizada.

---

### 11. **Máscaras de Input: react-imask**

**Escolha:** react-imask 7.6.1 para CPF/CNPJ e moeda

**Justificativa:**

- Performance superior ao react-input-mask
- Suporte a máscaras dinâmicas (CPF/CNPJ detecta automaticamente)
- Melhor integração com React Hook Form
- Validação integrada com máscara

---

### 12. **Dark Mode: Implementação Customizada**

**Escolha:** Sistema de dark mode usando variáveis CSS e classe `dark`

**Justificativa:**

- Variáveis CSS permitem mudança de tema sem re-render
- Suporte a preferência do sistema (`prefers-color-scheme`)
- Toggle manual via componente
- Sidebar e Header mantêm cores fixas (requisito de design)

---

## ⏱️ Tempo Aproximado de Desenvolvimento

**Total:** ~24-30 horas distribuídas em 3 dias

## 🚀 Melhorias Futuras

### Curto Prazo

1. **Testes E2E**
   - Implementar testes end-to-end com Cypress
   - Cobrir fluxos críticos (criar transação, filtrar, pesquisar)

2. **Otimizações de Performance**
   - Implementar virtualização na tabela para grandes volumes de dados
   - Lazy loading de componentes pesados
   - Otimização de imagens com next/image

3. **Acessibilidade**
   - Adicionar ARIA labels em todos os componentes
   - Navegação por teclado completa
   - Suporte a screen readers
   - Testes com ferramentas de acessibilidade

4. **Feedback Visual**
   - Implementar toast notifications para ações do usuário
   - Loading states mais granulares
   - Animações de transição entre estados

### Médio Prazo

5. **Funcionalidades Adicionais**
   - Exportação de transações (CSV, PDF)
   - Histórico de ações do usuário
   - Filtros salvos/favoritos
   - Notificações em tempo real (WebSocket)

6. **Monitoramento e Analytics**
   - Integração com ferramentas de monitoramento (Sentry)
   - Analytics de uso
   - Performance monitoring

7. **Documentação de Componentes**
   - Storybook para documentação visual de componentes
   - Exemplos de uso para cada componente
   - Guia de contribuição

### Longo Prazo

8. **PWA (Progressive Web App)**
   - Service Workers para offline
   - Instalação como app
   - Notificações push

9. **Escalabilidade**
   - Micro-frontends se necessário
   - CDN para assets estáticos
   - Otimização de bundle size

---

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://fe-challenge-trace-api-production.up.railway.app
```

---

## 🔍 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento com Turbopack

# Build e Produção
npm run build            # Cria build de produção
npm start                # Inicia servidor de produção

# Qualidade de Código
npm run check-types      # Verifica tipos TypeScript
npm run check-format     # Verifica formatação
npm run format           # Formata código automaticamente
npm run check-lint       # Verifica lint

# Testes
npm test                 # Executa testes unitários
npm run test:watch       # Modo watch dos testes
npm run test:coverage    # Testes com cobertura
npm run cy:open          # Abre Cypress
npm run cy:run:component # Executa testes de componentes

# Git Hooks
npm run commit           # Commit interativo com Commitizen (Conventional Commits)
                        # Abre prompt para criar commits padronizados
```

---

## 📖 Estrutura do Projeto

Para mais detalhes sobre a arquitetura, consulte [ARCHITECTURE.md](./src/ARCHITECTURE.md)

---

## 🎯 Resumo das Escolhas Técnicas

| Categoria          | Tecnologia Escolhida    | Alternativas Consideradas   | Motivo da Escolha                     |
| ------------------ | ----------------------- | --------------------------- | ------------------------------------- |
| Framework          | Next.js 15 (App Router) | Pages Router                | Melhor performance, Server Components |
| Linguagem          | TypeScript 5.3.3        | JavaScript                  | Type safety, melhor DX                |
| Estado de Servidor | React Query             | SWR, Apollo Client          | Cache automático, estados gerenciados |
| Estado de UI       | React Hooks (useState)  | Zustand, Redux, Context API | Simplicidade, sem dependência extra   |
| Formulários        | React Hook Form + Zod   | Formik + Yup                | Performance, type-safety              |
| HTTP Client        | Axios + React Query     | Fetch API                   | Cache, estados automáticos            |
| Estilização        | Tailwind CSS            | Styled Components           | Desenvolvimento rápido, tokens        |
| Testes Unitários   | Jest + Testing Library  | Vitest                      | Padrão do ecossistema React           |
| Testes Componentes | Cypress                 | Playwright                  | Visualização em tempo real            |
| i18n               | next-intl               | react-i18next               | Integração nativa Next.js             |
| Máscaras           | react-imask             | react-input-mask            | Performance superior                  |
| Linting            | ESLint + Prettier       | Biome                       | Padrão da indústria                   |
| Git Hooks          | Husky + Commitlint      | -                           | Garantir qualidade                    |

---

**Documentação criada com foco em clareza e detalhamento técnico das decisões arquiteturais.**
