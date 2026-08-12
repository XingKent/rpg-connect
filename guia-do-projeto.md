# Guia do Projeto — do zero, pra quem nunca viu essas ferramentas

Você disse que é iniciante em tudo (menos GitHub), então este guia começa nos conceitos e só depois entra no código. A ideia é: no final, você consegue abrir qualquer arquivo do projeto e entender o que ele faz.

---

## 1. As peças do quebra-cabeça (visão de 30 mil pés)

Um site como o nosso precisa resolver três problemas:

1. **Desenhar a tela** (botões, cards, textos) → isso é o **React**.
2. **Deixar o código mais seguro**, avisando erros antes mesmo de rodar → isso é o **TypeScript**.
3. **Deixar tudo bonito** sem escrever CSS do zero → isso é o **Tailwind CSS**.
4. **Guardar as escolhas do usuário** (raça, classe, atributos...) enquanto ele navega → isso é o **Zustand**.
5. **Trocar de página sem recarregar o site** → isso é o **React Router**.
6. **Rodar tudo isso rápido no seu computador enquanto você programa** → isso é o **Vite**.
7. **Garantir que o código continua funcionando depois de mudanças** → isso é o **Vitest**.

Cada um resolve *um* problema específico. Vamos um por um.

---

## 2. As ferramentas, explicadas com analogias

### Node.js e npm — a "loja de peças"

Node.js é o que permite rodar JavaScript fora do navegador (no seu computador, direto no terminal). O `npm` (Node Package Manager) é a loja de onde baixamos "peças prontas" — bibliotecas que outras pessoas escreveram — em vez de reinventar tudo.

O arquivo **`package.json`** é a lista de compras: quais peças (dependências) o projeto usa e quais versões.

```json
"dependencies": {
  "react": "^19.2.8",
  "zustand": "^5.0.8",
  ...
}
```

Quando você roda `npm install`, o npm lê essa lista e baixa cada peça pra pasta `node_modules` (que a gente nem versiona no Git — ela é grande e é sempre recriável a partir do `package.json`).

### TypeScript — JavaScript com um "corretor ortográfico" de tipos

JavaScript é a linguagem que roda no navegador. TypeScript é JavaScript **+ tipos**: você declara que tipo de dado cada coisa é (texto, número, uma lista, um objeto com formato específico), e o editor te avisa **antes de rodar o código** se você errou.

Exemplo real do projeto (`src/types/bg3.ts`):

```ts
export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
```

Isso diz: "uma `AbilityKey` só pode ser um desses 6 textos exatos". Se em algum lugar do código alguém tentar usar `'strength'` (errado) em vez de `'str'`, o TypeScript acusa erro na hora, sem precisar nem abrir o navegador. Arquivos TypeScript terminam em `.ts` (lógica pura) ou `.tsx` (quando tem HTML misturado, que é o caso dos componentes React).

### Vite — o "servidor de testes" super rápido

Vite faz duas coisas:
- **Modo desenvolvimento** (`npm run dev`): sobe um servidor local no seu PC que atualiza a tela sozinho toda vez que você salva um arquivo.
- **Modo build** (`npm run build`): empacota tudo (centenas de arquivos `.ts`/`.tsx`) em poucos arquivos otimizados (`.js`, `.css`) prontos pra colocar num servidor de verdade.

O arquivo `vite.config.ts` configura isso — por exemplo, o atalho `@/` que usamos em todo import (`@/components/Button` em vez de `../../components/Button`) é definido lá.

### React — a biblioteca que desenha a tela em "peças" (componentes)

A ideia central do React: em vez de escrever uma página HTML gigante, você quebra a tela em **componentes** — pedacinhos reutilizáveis, cada um uma função que retorna "como aquele pedaço deve aparecer".

Veja o componente mais simples do projeto, `src/components/ui/Button.tsx`:

```tsx
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`... ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
```

Isso é uma função chamada `Button` que:
- Recebe "props" (propriedades) — aqui, `variant` (qual estilo de botão) e `className` (classes CSS extras).
- Retorna JSX — aquele código que parece HTML dentro do JavaScript (`<button>...</button>`). É JSX, não HTML puro; o Vite transforma isso em JavaScript de verdade nos bastidores.

Toda vez que você usa `<Button variant="ghost">Salvar</Button>` em outro arquivo, o React chama essa função e desenha o botão. **Um componente = uma função que retorna interface.**

### JSX — por que tem HTML dentro do JavaScript?

`{variantClasses[variant]}` dentro do JSX é JavaScript "vazando" pro meio do HTML — as chaves `{ }` dizem "aqui dentro é código, não texto". É assim que o React mistura lógica com visual no mesmo arquivo.

### Hooks — funções especiais que começam com "use"

React tem funções especiais chamadas **hooks** que só podem ser usadas dentro de componentes. As duas que mais aparecem no projeto:

- **`useState`**: guarda um valor que pode mudar, e quando muda, a tela redesenha sozinha.
  ```tsx
  const [open, setOpen] = useState(false); // começa fechado
  setOpen(true); // "abre" — o React redesenha automaticamente
  ```
- **`useEffect`**: roda código em resposta a algo acontecer (ex: quando o componente aparece na tela, ou quando um valor muda).

Vamos ver isso em código real daqui a pouco.

### Tailwind CSS — estilizar sem escrever CSS separado

Em vez de criar um arquivo `.css` com classes tipo `.botao-principal { background: gold; }`, o Tailwind te dá centenas de "classes prontas" que você combina direto no HTML/JSX:

```tsx
className="bg-gold text-void border border-gold-bright hover:bg-gold-bright"
```

Cada pedacinho é uma regra CSS: `bg-gold` = fundo dourado, `hover:bg-gold-bright` = fica mais claro ao passar o mouse. As cores customizadas do nosso tema (`gold`, `void`, `ink`, `crimson`...) foram definidas em `src/index.css`, então o Tailwind sabe o que `bg-gold` significa *nesse* projeto especificamente.

### React Router — trocar de "página" sem recarregar o site

Sites tradicionais recarregam a página inteira a cada clique em um link. O React Router intercepta isso e só troca o *conteúdo*, mantendo o site "vivo" (mais rápido, sem piscar). Em `src/App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/build-planner" element={<BuildPlanner />} />
  <Route path="/builds" element={<SavedBuilds />} />
  <Route path="/build/:code" element={<SharedBuildView />} />
</Routes>
```

Isso diz: "quando a URL for `/build-planner`, mostre o componente `<BuildPlanner />`". O `:code` em `/build/:code` é um "parâmetro" — captura qualquer texto ali (o código da build compartilhada) pra usar dentro do componente.

### Zustand — a "memória compartilhada" do app

Aqui está o conceito mais importante pra entender o projeto. Sem um gerenciador de estado, cada componente só conhece seus próprios dados. Mas a build (raça, classe, atributos escolhidos) precisa ser vista e alterada por **vários componentes diferentes** (a etapa de Raça, a de Classe, o Resumo, a Navbar...). O Zustand cria uma "caixa" única de dados que qualquer componente pode ler e modificar.

É basicamente um arquivo (`src/features/build-planner/store/buildStore.ts`) com:
1. **O estado** — os dados guardados agora (`draft`, a build em edição; `savedBuilds`, a lista salva).
2. **As ações** — funções que mudam esse estado (`setRace`, `toggleFeat`, `setLevel`...).

Vamos destrinchar esse arquivo com calma na seção 5.

### Vitest + Testing Library — "provar" que o código funciona

Testes são pequenos programas que rodam seu código com entradas conhecidas e checam se o resultado é o esperado — sem precisar você clicar manualmente em tudo toda vez que muda algo. Exemplo (`src/lib/dice.test.ts`):

```ts
it('sempre retorna um número entre 1 e o número de lados', () => {
  const resultado = rollDie(6);
  expect(resultado).toBeGreaterThanOrEqual(1);
  expect(resultado).toBeLessThanOrEqual(6);
});
```

Rodamos com `npm run test` — se algo quebrar (ex: você editar `rollDie` e introduzir um bug), o teste falha e avisa exatamente o quê.

### ESLint + Prettier — os "revisores" automáticos

- **ESLint** procura erros e más práticas no código (variável não usada, etc).
- **Prettier** só formata (indentação, aspas, quebra de linha) — deixa todo mundo escrevendo no mesmo estilo, sem discussão.

Rodam com `npm run lint` e `npm run format`.

---

## 3. A estrutura de pastas, explicada

```
src/
  App.tsx              → o "esqueleto": monta Navbar + Rodapé + decide qual página mostrar
  main.tsx             → o ponto de partida: pega o App e "planta" ele na página HTML
  index.css            → cores, fontes e estilos base do tema

  components/          → peças de UI genéricas, usadas em várias telas (Button, Navbar...)
  pages/                → páginas de nível de site inteiro (só a Home, por enquanto)
  types/                → os "formatos" de dados (o que é uma Raça, uma Magia, uma Build...)
  data/                 → os dados de verdade do jogo (lista de raças, magias, itens...)
  lib/                  → funções utilitárias soltas (ex: rolar um dado)
  test/                 → configuração dos testes

  features/
    build-planner/      → TUDO relacionado à Parte 1 (a única pronta até agora)
      steps/             → cada etapa do formulário (RaceStep, ClassStep, FeatsStep...)
      store/              → a "memória" da build (buildStore.ts)
      lib/                → cálculos específicos do planner (pontos de atributo, bônus finais)
      components/         → peças de UI só usadas aqui (LevelControl, AbilityGauge)
      pages/              → páginas só desse recurso (Minhas Builds, Build Compartilhada)

    wiki/, quest-tracker/, ...  → pastas reservadas pras próximas 7 partes (ainda vazias)
```

**A regra que seguimos:** se o código só faz sentido dentro do Build Planner, ele mora em `features/build-planner/`. Se pode ser reaproveitado por outras partes (tipos, dados do jogo, botões genéricos), fica nas pastas de fora.

---

## 4. Anatomia de um componente — passo a passo

Vamos ler `RaceStep.tsx` (a etapa de escolher raça) linha por linha, porque ele usa quase todos os conceitos de uma vez:

```tsx
import { races } from '@/data/races';
import { SelectCard } from '@/components/ui/SelectCard';
import { Button } from '@/components/ui/Button';
import { useBuildStore } from '@/features/build-planner/store/buildStore';
```
Os `import` trazem: a lista de raças (dado puro), dois componentes de UI prontos, e o hook do Zustand pra acessar a "memória" da build.

```tsx
export function RaceStep() {
  const draft = useBuildStore((s) => s.draft);
  const setRace = useBuildStore((s) => s.setRace);
  const clearRace = useBuildStore((s) => s.clearRace);
```
`useBuildStore((s) => s.draft)` pergunta ao Zustand: "me dá o valor atual de `draft`". `useBuildStore((s) => s.setRace)` pega a *função* que muda a raça. Sempre que `draft` mudar em qualquer lugar do app, este componente redesenha sozinho — é a "mágica" do Zustand + React trabalhando juntos.

```tsx
  const selectedRace = races.find((r) => r.id === draft.raceId);
```
`.find()` é um método de array do JavaScript: percorre a lista `races` e devolve o primeiro item cujo `id` bate com a raça escolhida na build atual.

```tsx
      {draft.raceId && (
        <Button variant="ghost" onClick={clearRace}>
          Limpar seleção
        </Button>
      )}
```
Isso é uma "renderização condicional": `draft.raceId && (...)` só mostra o botão **se** `draft.raceId` não estiver vazio. É um truque comum em JSX — usa o `&&` do JavaScript (que só "passa pro lado direito" se o esquerdo for verdadeiro).

```tsx
      {races.map((race) => (
        <SelectCard
          key={race.id}
          title={race.name}
          selected={draft.raceId === race.id}
          onClick={() => setRace(race.id, race.subraces?.[0]?.id)}
          ...
        />
      ))}
```
`.map()` transforma cada item da lista `races` em um componente `<SelectCard>` na tela — é assim que uma lista de 5 raças vira 5 cards. `key={race.id}` é obrigatório em listas no React (ajuda ele a saber qual card é qual ao atualizar). `onClick={() => setRace(...)}` diz: "quando clicar, chame a função `setRace` da memória compartilhada".

**Resumo do fluxo**: usuário clica num card → `setRace('wood-elf')` é chamado → o Zustand atualiza `draft.raceId` → **todo componente que lê `draft.raceId`** (este `RaceStep`, o `SummaryStep`, a barra de progresso...) redesenha automaticamente com o novo valor. Você nunca precisa dizer manualmente "agora atualize a tela ali" — o React faz isso sozinho.

---

## 5. O coração do app: `buildStore.ts`

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
```
`create` monta a "caixa de memória". `persist` é um extra que salva automaticamente no `localStorage` do navegador (por isso suas builds continuam lá mesmo se você fechar a aba).

```ts
function emptyDraft(): Build {
  return {
    id: crypto.randomUUID(),
    name: '',
    level: 12,
    raceId: '',
    ...
  };
}
```
Uma função que cria uma build "em branco" — usada tanto no início quanto quando você clica em "Nova build". `crypto.randomUUID()` gera um identificador único aleatório (tipo `a1b2c3d4-...`), pra cada build ter um "nome" interno que não se repete.

```ts
interface BuildStoreState {
  draft: Build;
  savedBuilds: Build[];
  setName: (name: string) => void;
  setRace: (raceId: string, subraceId?: string) => void;
  ...
}
```
Isso é um **contrato TypeScript**: declara exatamente quais dados (`draft`, `savedBuilds`) e quais funções (`setName`, `setRace`...) essa memória vai ter. Se em qualquer lugar do código alguém tentar chamar `setRace(123)` (número em vez de texto), o TypeScript acusa erro.

```ts
setRace: (raceId, subraceId) =>
  set((s) => ({ draft: { ...s.draft, raceId, subraceId, ...touch() } })),
```
Isso é o "miolo" de uma ação. `set(...)` é a função do Zustand pra atualizar o estado. `{ ...s.draft, raceId, subraceId }` usa o operador `...` (spread): "copia tudo que já tinha em `s.draft`, mas sobrescreve `raceId` e `subraceId` com os novos valores". Isso é importante em React/Zustand: **nunca editamos o objeto antigo diretamente** — sempre criamos um objeto novo, porque é assim que o React percebe "algo mudou, preciso redesenhar".

---

## 6. Tipos: o "contrato" dos dados (`types/bg3.ts`)

```ts
export interface Build {
  id: string;
  name: string;
  level: number;
  raceId: string;
  subraceId?: string;
  ...
}
```
`interface` descreve o formato de um objeto. `subraceId?: string` — o `?` significa "opcional, pode não existir" (nem toda raça tem sublinhagem). Isso é o que garante que, em qualquer lugar do app, uma "Build" sempre tem exatamente esses campos, com esses tipos — o editor te avisa na hora se você esquecer um campo obrigatório ou usar o tipo errado.

---

## 7. Um fluxo completo, de ponta a ponta

Vamos seguir o que acontece quando você clica em "Salvar build":

1. **Clique** → dispara `onClick={handleSave}` no botão (`SummaryStep.tsx`).
2. **`handleSave`** chama `saveDraft()`, uma ação do Zustand.
3. **Dentro do store**, `saveDraft()` pega o `draft` atual, gera um `updatedAt` novo, e decide: já existe uma build salva com esse `id`? Se sim, substitui; se não, adiciona na lista `savedBuilds`.
4. **`set({ savedBuilds })`** atualiza a memória compartilhada.
5. **O middleware `persist`** detecta a mudança e escreve automaticamente no `localStorage` do navegador.
6. **Qualquer componente que lê `savedBuilds`** (como a página "Minhas Builds") redesenha sozinho com a nova lista — sem você precisar avisar manualmente.

Esse padrão — **ação dispara mudança de estado → estado muda → tela redesenha sozinha** — é o coração de como React funciona, e vale pra praticamente tudo no projeto.

---

## 8. Glossário rápido

| Termo | O que significa aqui |
|---|---|
| **Componente** | Uma função que retorna pedaço de interface (ex: `Button`, `RaceStep`) |
| **Props** | Os "argumentos" que você passa pra um componente (`<Button variant="ghost">`) |
| **Estado (state)** | Dado que pode mudar e faz a tela redesenhar quando muda |
| **Hook** | Função especial do React (`useState`, `useEffect`, `useBuildStore`) |
| **JSX** | A sintaxe tipo-HTML dentro do JavaScript/TypeScript |
| **Store** | A "caixa de memória" compartilhada (Zustand) |
| **Interface / type** | O "formato" que um dado deve ter, em TypeScript |
| **Import/export** | Como um arquivo usa código de outro arquivo |
| **Spread (`...`)** | Copia os campos de um objeto/array pra outro |
| **Render / redesenhar** | O React atualizando a tela pra refletir o estado atual |

---

## Por onde continuar explorando

Sugestão de ordem pra ler o código com essas explicações na mão:

1. `src/types/bg3.ts` — entenda o "vocabulário" de dados do projeto
2. `src/data/races.ts` — um exemplo simples de dado estático
3. `src/components/ui/Button.tsx` e `SelectCard.tsx` — componentes pequenos e genéricos
4. `src/features/build-planner/steps/RaceStep.tsx` — um componente "de verdade" usando o store
5. `src/features/build-planner/store/buildStore.ts` — o arquivo mais importante do projeto
6. `src/features/build-planner/BuildPlanner.tsx` — como as etapas se conectam
7. `src/App.tsx` — como tudo se junta no topo

Qualquer arquivo que travar o entendimento, me chama e eu destrincho ele especificamente, do mesmo jeito.
