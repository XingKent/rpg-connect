# BG3 Companion — Build Planner (MVP · Fase 1)

Primeira fase de um projeto maior (BG3 Companion): um site para montar builds de Baldur's Gate 3 antes de jogar, com wiki pesquisável e quest tracker vindo em seguida.

Este MVP cobre o **Build Planner** completo, 100% client-side (sem backend ainda):

- Escolha de raça e sublinhagem
- Escolha de classe e subclasse
- Distribuição de atributos por compra de pontos (27 pts, igual ao jogo)
- Seleção de talentos
- Seleção de magias (filtradas pela classe)
- Seleção de equipamentos
- Resumo com bônus finais (atributos, modificadores, Classe de Armadura)
- Salvar builds localmente (localStorage via Zustand)
- Compartilhar build por link (build inteira codificada na URL, sem precisar de servidor)

## Stack

- React + Vite + TypeScript
- React Router
- Zustand (estado + persistência local)
- Tailwind CSS v4
- Framer Motion (transições entre etapas)
- lz-string (compressão da build para a URL de compartilhamento)
- Vitest + Testing Library (testes)
- ESLint + Prettier

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

| Comando               | O que faz                       |
| ---------------------- | -------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento      |
| `npm run build`         | Type-check + build de produção   |
| `npm run preview`       | Preview do build de produção     |
| `npm run lint`          | ESLint                           |
| `npm run format`        | Formata o código com Prettier    |
| `npm run test`          | Roda os testes uma vez           |
| `npm run test:watch`    | Testes em modo watch             |

## Estrutura

O projeto está organizado por **features**, já pensando nas 8 partes do roadmap completo. Cada parte futura ganha sua própria pasta em `features/`, mesmo antes de ser implementada - hoje elas têm só um `README.md` marcando o que vai entrar ali.

```
src/
  App.tsx                  # Rotas + Navbar
  components/            # UI genérica reaproveitável entre features (Button, SelectCard, StepRail, Navbar)
  config/
    roadmap.ts            # Lista as 8 partes do projeto, usada pela Navbar (status: pronto/atual/em breve)
  data/                    # Dataset compartilhado do jogo (raças, classes, talentos, magias, equipamentos)
  features/
    build-planner/         # Parte 1 — completa
      components/          # UI específica do planner (AbilityGauge)
      lib/                 # point-buy, cálculo de bônus finais, encode/decode de share
      pages/                # Minhas Builds, Build Compartilhada
      steps/                # Cada etapa do fluxo (Race, Class, Subclass, Abilities...)
      store/                # Zustand (draft + builds salvas)
      BuildPlanner.tsx      # Orquestrador das etapas
    wiki/                   # Parte 2 — planejado (só README por enquanto)
    quest-tracker/          # Parte 3 — planejado
    companion-approval-tracker/  # Parte 4 — planejado
    interactive-map/        # Parte 5 — planejado
    combat-simulator/       # Parte 6 — planejado
    loot-finder/             # Parte 7 — planejado
    achievement-tracker/    # Parte 8 — planejado
  pages/
    Home.tsx                # Landing page do site (nível de app, não de feature)
  types/
    bg3.ts                   # Tipos de domínio compartilhados (Race, CharClass, Equipment, Build...)
  test/
    setup.ts                 # Bootstrap do Vitest
```

**Regra geral**: se o código só faz sentido dentro de uma parte específica (ex.: cálculo de point-buy, store de build), ele mora em `features/<parte>/`. Se é reaproveitado por várias partes (tipos de domínio, dataset do jogo, componentes de UI genéricos), fica nas pastas de nível superior (`types/`, `data/`, `components/`).

### Navbar e roadmap

A navbar (`components/Navbar.tsx`) tem um menu "Roteiro" que mostra as 8 partes do projeto com status (pronto / em construção / em breve), lendo de `config/roadmap.ts`. As partes ainda não implementadas aparecem com cadeado e não são clicáveis — para "ativar" uma parte nova, basta adicionar sua rota em `App.tsx` e trocar o `status`/`path` correspondente em `config/roadmap.ts`.

## Roadmap (próximas fases)

1. **Wiki pesquisável** e **Quest Tracker** (ainda client-side)
2. Autenticação + backend em Django REST Framework + PostgreSQL, para sincronizar builds na nuvem (troca do encode-na-URL por endpoint de share com slug curto)
3. Companion Approval Tracker, Interactive Map, Combat Simulator, Loot Finder, Achievement Tracker

## Notas de design

O dataset em `src/data/` é um subconjunto pequeno, com descrições escritas do zero — o suficiente para validar o fluxo ponta a ponta. Antes de ir para produção vale expandir para o conteúdo completo do jogo.
