# BG3 Companion

Um site para montar builds de Baldur's Gate 3 antes de jogar — raça, classe, atributos, talentos, magias e equipamentos, com resumo de bônus finais e compartilhamento por link.

Projeto de fã, sem afiliação com a Larian Studios.

## Partes prontas

- **Build Planner** - crie e compartilhe builds completas
- **Achievement Tracker** - acompanhe manualmente as conquistas desbloqueadas

As próximas 6 partes (Wiki, Quest Tracker, Companion Approval Tracker, Interactive Map, Combat Simulator, Loot Finder) estão no roadmap dentro do próprio site (menu "Roteiro").

## Stack

- React + Vite + TypeScript
- React Router
- Zustand (estado + persistência local)
- Tailwind CSS v4
- Framer Motion
- Vitest + Testing Library
- ESLint + Prettier

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

| Comando            | O que faz                       |
| ------------------- | -------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento      |
| `npm run build`      | Type-check + build de produção   |
| `npm run preview`    | Preview do build de produção     |
| `npm run lint`       | ESLint                           |
| `npm run format`     | Formata o código com Prettier    |
| `npm run test`       | Roda os testes uma vez           |
| `npm run test:watch` | Testes em modo watch             |

## Deploy

Pronto pra Vercel: importe o repositório (ela detecta o Vite automaticamente). O `vercel.json` na raiz já inclui o rewrite necessário para as rotas do React Router funcionarem em acesso direto/refresh.

## Dados e créditos

Magias e itens combinam o SRD de D&D 5e ([Open5e](https://open5e.com)) com referências específicas do BG3 ([bg3.wiki](https://bg3.wiki)), marcadas com o selo "BG3" onde aparecem.

