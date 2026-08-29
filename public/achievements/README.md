# Imagens das conquistas

Coloque aqui os ícones/imagens de cada conquista (formato recomendado: `.webp`, quadrado, ~256x256px).

Como o Vite serve tudo dentro de `public/` a partir da raiz do site, uma imagem salva em:

```
public/achievements/img.webp
```

é referenciada no dataset (`src/features/achievement-tracker/data/achievements.ts`) assim:

```ts
{
  id: 'Devil-in-the-Details',
  name: 'O Diabo Mora nos Detalhes',
  description: 'Derrote o Comandante Zhalk no Nautiloide.',
  category: 'Prólogo',
  image: '/achievements/img.webp',
}
```

Se o campo `image` for omitido, o card mostra um ícone de troféu como placeholder (veja `AchievementIcon.tsx`).
