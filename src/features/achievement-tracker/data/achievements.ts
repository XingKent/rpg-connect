import type { Achievement } from '@/features/achievement-tracker/types';

export const achievements: Achievement[] = [
  // Prólogo
  {
    id: 'Descent-From-Avernus',
    name: 'Decida de Avernus',
    description: 'Tome controle do nauutiloide e escape dos Infernos.',
    category: 'Prólogo',
  },
  {
    id: 'Devil-in-the-Details',
    name: 'O Diabo Mora nos Detalhes',
    description: 'Derrote o Comandante Zhalk no Nautiloide.',
    category: 'Prólogo',
  },

  //Ato 1
  {
    id: 'She-Cannot-Be-Caged',
    name: 'Deixem Ela Ir!',
    description:
      'Resgate Sazza do santuário dos druidas, acampamento golbin e Torres do Luar em uma única aventura.',
    category: 'Ato 1',
  },
  {
    id: 'You-Have-Two-Hands-for-a-Reason',
    name: 'Vantagens de ter Duas Mãos',
    description:
      'Faça carinhos no Coçada e no Urso-Coruja ao mesmo tempo - a maior alegria para qualquer aventureiro.',
    category: 'Ato 1',
  },
  {
    id: 'Fetch-Quest',
    name: 'Vai Pegar!',
    description: 'Brinque de buscar com Coçada - o melhor cachorro dos reinos.',
    category: 'Ato 1',
  },
  {
    id: 'Expand-Your-Mind',
    name: 'Expansão da Consciência',
    description: 'Consuma um parasita e desbloqueie um novo poder. O que é isso se contorcendo aí dentro?',
    category: 'Ato 1',
  },
  {
    id: 'Pest-Control',
    name: 'Controle de Pragas',
    description:
      'Mate a aranha interplanar matriarca antes que seus ovos choquem. Por que elas têm tantas pernas?',
    category: 'Ato 1',
  },
  {
    id: 'Rude-Crude-and-Full-of-Attitude',
    name: 'Linda, Louca e Mimada',
    description: 'Encontre e envoque a Quasit Pá. Ou o nome é... Garfo? Talvez Cesta?',
    category: 'Ato 1',
  },
  {
    id: 'Forged-in-Blood-and-Fire',
    name: 'A Ferro e Fogo',
    description: 'Crie um item na Forja de Adamantina.',
    category: 'Ato 1',
  },
  {
    id: 'A-Grym-Fate',
    name: 'Um Destino Atroz',
    description: 'Mate o golem de adamantina sem usar o martelo da forja.',
    category: 'Ato 1',
  },
  {
    id: 'The-Plot-Thickens',
    name: 'A Trama se Complica',
    description: 'Conclua o Ato I. Adentre um lugar bem mais sombrio.',
    category: 'Ato 1',
  },

  //Ato 2
  {
    id: "The-Lich-Queen's-Wrath",
    name: 'A Ira da Rainha Lich',
    description: 'Una-se a Voss contra a rainha-deusa githyanki. Boa sorte.',
    category: 'Ato 2',
  },
  {
    id: 'Non-Invasive-Procedure',
    name: 'Procedimento Não Invasivo',
    description: 'Mate o cirurgião sem deixá-lo usar suas habilidades cirúrgicas em combate.',
    category: 'Ato 2',
  },
  {
    id: 'Penny-Pincher',
    name: 'Mão de Vaca',
    description: 'Derrote a exatora sem deixá-la usar ouro contra você - excelente planejamento financeiro.',
    category: 'Ato 2',
  },
  {
    id: 'Under-Lock-and-Key',
    name: 'Fechado a Sete Chaves',
    description: 'Resgate todos os prisioneiros das profundezas de Torres do Luar em uma aventura.',
    category: 'Ato 2',
  },
  {
    id: 'No-Free-Lunches',
    name: 'Não Existe Almoço Grátis',
    description: 'Derrote o apótolo de Myrkul antes que ele consuma qualquer necromita.',
    category: 'Ato 2',
  },
  {
    id: 'Taking-Blood',
    name: 'Tirando Sangue',
    description: 'Roube o sangue de Lathander debaixo do Mosteiro Rosamanhã.',
    category: 'Ato 2',
  },
  {
    id: 'The-City-Awaits',
    name: 'A cidade te Espera',
    description: "Saia do Ato II - Baldur's Gate e vá para a cidade de Elturel.",
    category: 'Ato 2',
  },

  // Ato 3
  {
    id: 'Fancy_Footwork',
    name: 'Dança Elegante',
    description: 'Derrote Gortash sem que uma única armadilha seja acionada - mais fácil falar do que fazer.',
    category: 'Ato 3',
  },
  {
    id: 'First-Blood',
    name: 'Sangue Originário',
    description: 'Mate Orin enquanto seus asseclas estão realizando o cântico ritualistico.',
    category: 'Ato 3',
  },
  {
    id: 'Crash-Landing',
    name: 'Pouso Forçado',
    description:
      'Na Via do Draco, espere até que o dragão esteja no meio do voo, então derrube-o do céu... BUM!',
    category: 'Ato 3',
  },
  {
    id: "Murder-in-Baldur's-Gate",
    name: "Assassinato em Baldur's Gate",
    description: "Cubra as ruas de Baldur's Gate de sangue. Torne-se um Assassino Profano de Bhaal.",
    category: 'Ato 3',
  },
  {
    id: 'Embrace-Your-Urge',
    name: 'Abrace o Impulso',
    description: 'Torne-se a arma definitiva de Bhaal. Torne-se seu Algoz.',
    category: 'Ato 3',
  },
  {
    id: 'Interfectorem-Draconis',
    name: 'Mata Dragões',
    description: 'Mate o dragão vermelho na Cidade Alta.',
    category: 'Ato 3',
  },

  // Companion
  {
    id: 'Just-a-Nibble',
    name: 'Só uma Mordidinha',
    description: 'Deixe Astarion te morder. Ai!',
    category: 'Companion',
  },
  {
    id: 'Repairing-the-Weave',
    name: 'Reparando a Trama',
    description: 'Estabilize a esfera de Nethheril de Gale.',
    category: 'Companion',
  },
  {
    id: 'To-Bloom-in-Darkest-Night',
    name: 'Florecer na Noite Mais Escura',
    description: 'Presenteie Umbralma com uma orquídea noturna. A gente sempre soube que ela era sensível.',
    category: 'Companion',
  },
  {
    id: 'Loophole',
    name: 'Brecha',
    description: 'Rompa o pacto de Wyll com Mizora.',
    category: 'Companion',
  },
  {
    id: 'Hot-Date',
    name: 'Encontro Tórrido',
    description: 'Ir para um encontro com a Karlach - isso sim é brincar com fogo.',
    category: 'Companion',
  },
  {
    id: 'Mind-Blown',
    name: 'Os Brutos Também Amam',
    description: 'Comece um romance com o Imperador.',
    category: 'Companion',
  },

  // Comunidade
  {
    id: 'Shove-Off',
    name: 'Empurrão Mortal',
    description: 'Mate uma criatura com dano de queda.',
    category: 'Comunidade',
  },
  {
    id: 'Outsourcing',
    name: 'Terceirização',
    description:
      'Contrate um mercenério. Use-o para amizade ou como bucha de canhão - ninguém está julgando.',
    category: 'Comunidade',
  },
  {
    id: 'Buscer',
    name: 'Artista de Rua',
    description: 'Ganhe cem moedas de ouro em uma única aventura tocando músicas doces e encantadoras.',
    category: 'Comunidade',
  },
  {
    id: 'Dig-for-Victory',
    name: 'A Vitória é Mais Embaixo',
    description: 'Desenterre cinco baús em uma única sessão. Tesouros, muitos tesouros!',
    category: 'Comunidade',
  },
  {
    id: 'Kill-Two-Birds-with-One-Gnome',
    name: 'Matar Dois Coelhos com Uma Gnomada',
    description: 'Use um inimigo como arma improvisada contra outro.',
    category: 'Comunidade',
  },
  {
    id: 'Fists-of-Fury',
    name: 'Punhos de Fúria',
    description: 'Mate um personagem com um ataque desarmado.',
    category: 'Comunidade',
  },
  {
    id: 'Punch-Drunk',
    name: 'Briga de Bar',
    description: 'Derrote vinte oponentes enquanto um personagem do grupo estiver bêbado.',
    category: 'Comunidade',
  },
  {
    id: 'Bedrolls-and-Breakfast',
    name: 'Sono Reparador',
    description:
      'Faça quatro descansos longos completos em uma única aventura. Quem disse que heróis não cansam?',
    category: 'Comunidade',
  },
  {
    id: 'Escapologist',
    name: 'Escapologia',
    description: 'Fuja da sua cela após uma prisão. Você não era radical?',
    category: 'Comunidade',
  },
  {
    id: 'No-Penny-Required',
    name: 'Livro Aberto',
    description: 'Use Detectar Pensamentos com sucesso para invadir os pensamentos de alguém.',
    category: 'Comunidade',
  },
  {
    id: 'Action-Surge',
    name: 'Rajada de Ação',
    description:
      'Execute cinco ataques em um turno. Seus inimigos não saberão o que os atingiu (literalmente).',
    category: 'Comunidade',
  },
  {
    id: 'Roleplayer',
    name: 'Interpretação Impecável',
    description: 'Complete dez objetivos da história pessoal em uma única aventura. Entre no personagem.',
    category: 'Comunidade',
  },
  {
    id: 'Bookworm',
    name: 'Leitura Voraz',
    description:
      'Leia 100 livros diferentes em uma única aventura. Heroísmo não se resume a missões ousadas.',
    category: 'Comunidade',
  },
  {
    id: 'Homebrever',
    name: 'Criador de Conteúdo',
    description: 'Crie três soluções alquimicas únicas em uma única aventura. Saúde!',
    category: 'Comunidade',
  },
  {
    id: 'Bottoms-Up',
    name: 'Vira, Vira, Vira',
    description: 'Faça um descanso longo usando apenas álcool. Uma tradição anã.',
    category: 'Comunidade',
  },
  {
    id: 'Jack-of-All-Trades',
    name: 'Pau pra Toda Obra',
    description:
      'Experimente todas as classes em uma única aventura sem pedir a Funestus para mudar seu personagem.',
    category: 'Comunidade',
  },
  {
    id: 'Leave-No-One-Behind',
    name: 'Ninguém Fica para Trás',
    description: 'Salve todos os refugiados tieflings possíveis durante o jogo em uma única aventura.',
    category: 'Comunidade',
  },

  // Endings
  {
    id: "All's-Weel-that-Ends-Well",
    name: 'Tudo Acaba Bem se Acaba Bem',
    description: 'termine o jogo (com um sincero "obrigado!" da Larian Studios).',
    category: 'Finais',
  },
  {
    id: 'Absolute-Power-Corrupts',
    name: 'Poder Absoluto, Corrupção Absoluta',
    description: 'Assuma o controle do Cérebro de Netheril, curve o mundo à sua vontade e reine com terror.',
    category: 'Finais',
  },
  {
    id: 'Hero-of-the-Forgotten-Realms',
    name: 'A Salvação dos Reinos Esquecidos',
    description: 'Mate o Cérebro de Netheril, destrua as larvas da Absoluta e salve o dia.',
    category: 'Finais',
  },
  {
    id: 'Sins-of-the-Father',
    name: 'Pecados do Pai',
    description:
      'Tome controle do Cérebro de Netheril em nome de Bhaal, semeie caos e reivindique o Trono de Sangue.',
    category: 'Finais',
  },
  {
    id: 'Ceremorphosis',
    name: 'Ceremorfose',
    description: 'Torne-se devorador de mentes, derrote o Cérebro de Netheril e faça o sacrifício final.',
    category: 'Finais',
  },
  {
    id: 'Critical-Hit',
    name: 'Acerto Crítico',
    description: 'Complete o jogo no modo estratégia.',
    category: 'Finais',
  },
];
