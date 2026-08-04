## Notas gerais

Tirar os nomes genericos e botar o nome dos itens reais.

-------------------------------------------------------

Seu objeto stats vai começar a ficar limitado rapidamente.

Hoje ele aceita:

stats: {
    str: 2,
    armorClass: 1
}

Só que os itens de BG3 fazem coisas como:

vantagem em testes;
magias;
ações novas;
bônus contra mortos-vivos;
redução de dano;
aumento da iniciativa;
bônus enquanto Concentrando;
efeitos em Forma Selvagem;
imunidades;
resistência elemental;
recuperação de spell slots...

Você vai acabar criando campos como

initiative
fireResistance
coldResistance
criticalRange

e o objeto cresce sem parar.

Eu faria assim
interface Equipment {
    id: string;
    name: string;

    slot: Slot;

    rarity: Rarity;

    act: 1 | 2 | 3;

    weight: number;

    value: number;

    image: string;

    description: string;

    location: string;

    classes?: string[];

    stats: EquipmentStat[];

    actions?: EquipmentAction[];
}

onde

interface EquipmentStat {
    type:
        | 'strength'
        | 'dexterity'
        | 'constitution'
        | 'armor-class'
        | 'initiative'
        | 'movement'
        | 'damage'
        | 'spell-save-dc'
        | 'spell-attack';

    value: number | string;
}

e

interface EquipmentAction {
    name: string;

    description: string;

    cooldown:
        | 'none'
        | 'short-rest'
        | 'long-rest';

    type:
        | 'spell'
        | 'passive'
        | 'action'
        | 'bonus-action'
        | 'reaction';
}

------------------------------------------------

Adicionar campo de sinergias 
bestFor:

------------------------------------------------

Botão para limpar campo

-----------------------------------------------

Botão nova build limpar todos os campos

---------------------------------------------

Apos escolha da classe, AbilitiesStep recomendado automatico

---------------------------------------------------------------

FeatsStep limitado apenas para 3 talentos

-------------------------------------------------------------

Separar subclasse da aba de classes, criando a aba subclasses logo apos a aba classes.

-------------------------------------------------------------------------------------