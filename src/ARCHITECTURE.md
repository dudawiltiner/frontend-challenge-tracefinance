# Arquitetura do Projeto

## Estrutura de Pastas

```
src/
├── design-tokens/          # Tokens de design (cores, espaçamentos, tipografia)
├── components/             # Componentes organizados por Atomic Design
│   ├── atoms/             # Componentes básicos reutilizáveis
│   ├── molecules/          # Componentes compostos
│   ├── organisms/          # Componentes complexos
│   └── screens/            # Telas completas (orquestram componentes)
├── hooks/                  # Hooks reutilizáveis
│   ├── forms/             # Hooks relacionados a formulários
│   ├── navigation/        # Hooks de navegação
│   └── transactions/      # Hooks específicos de transações
├── utils/                  # Funções utilitárias
│   ├── validation/        # Validadores reutilizáveis
│   └── transactions/       # Funções de domínio de transações
└── app/                    # Páginas do Next.js (apenas imports de screens)
```

## Princípios Aplicados

### Clean Code

- Funções pequenas e com responsabilidade única
- Nomes descritivos e claros
- Código auto-documentado
- Máximo de 150 linhas por arquivo

### SOLID (sem OOP)

- **Single Responsibility**: Cada função/componente tem uma única responsabilidade
- **Open/Closed**: Componentes extensíveis via props
- **Liskov Substitution**: Componentes podem ser substituídos por variantes
- **Interface Segregation**: Props específicas e bem definidas
- **Dependency Inversion**: Dependências injetadas via props/hooks

### Separação de Responsabilidades

- **Screens**: Orquestram componentes e hooks
- **Organisms**: Componentes complexos com lógica visual
- **Molecules**: Componentes compostos simples
- **Atoms**: Componentes básicos sem lógica
- **Hooks**: Lógica de estado e efeitos
- **Utils**: Funções puras e reutilizáveis

## Design Tokens

Todos os valores de design (cores, espaçamentos, tipografia) estão centralizados em `src/design-tokens/` e são usados via Tailwind CSS configurado.

### Uso de Tokens

```tsx
// ❌ Ruim - Cores hardcoded
<div className="bg-[#00F2B1] text-[#25282D]">

// ✅ Bom - Usando tokens
<div className="bg-primary-500 text-text-primary">
```

## Padrão de Arquivos

### Componentes

- `ComponentName.tsx` - Componente principal
- `ComponentName.types.ts` - Tipos TypeScript
- `index.ts` - Exportações
- `constants.ts` - Constantes do componente (se necessário)
- `sections/` - Sub-componentes (para organisms)
- `__tests__/` - Testes

### Hooks

- `useHookName.hook.ts` - Implementação do hook
- `index.ts` - Exportações

### Utils

- `domainName.functions.ts` - Funções do domínio
- `index.ts` - Exportações

## Exemplo de Refatoração

### Antes (Página com tudo)

```tsx
// page.tsx - 500+ linhas
export default function Page() {
  // Toda lógica aqui
  // Todo JSX aqui
}
```

### Depois (Separado)

```tsx
// page.tsx - 3 linhas
import { Screen } from '@screens/Screen';

export default function Page() {
  return <Screen />;
}

// Screen - Orquestra componentes
// Components - Lógica visual
// Hooks - Lógica de estado
// Utils - Funções puras
```
