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

```
src/
  components/         # UI genérica (Button, SelectCard, StepRail, AbilityGauge)
  data/                # Dataset de raças, classes, talentos, magias, equipamentos
  features/
    build-planner/     # Orquestrador das etapas + cada Step (Race, Class, ...)
  lib/                 # point-buy, cálculo de bônus finais, encode/decode de share
  pages/               # Home, Minhas Builds, Build Compartilhada
  store/               # Zustand (draft + builds salvas)
  types/               # Tipos compartilhados (pensados já para espelhar futuros models Django)
```

## Roadmap (próximas fases)

1. **Wiki pesquisável** e **Quest Tracker** (ainda client-side)
2. Autenticação + backend em Django REST Framework + PostgreSQL, para sincronizar builds na nuvem (troca do encode-na-URL por endpoint de share com slug curto)
3. Companion Approval Tracker, Interactive Map, Combat Simulator, Loot Finder, Achievement Tracker

## Notas de design

O dataset em `src/data/` é um subconjunto pequeno, com descrições escritas do zero — o suficiente para validar o fluxo ponta a ponta. Antes de ir para produção vale expandir para o conteúdo completo do jogo.
