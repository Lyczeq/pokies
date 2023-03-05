import { assign, createMachine } from 'xstate';
import { Pokemon } from '../types/Pokemon';

type EventToggleFavorite = {
  type: 'FAVORITE.TOGGLE';
  newFavorite: Pokemon;
};

export const favoritePokemonsMachine = createMachine({
  id: 'favoritePokemons',
  predictableActionArguments: true,
  context: { favorites: [] as Pokemon[] },
  schema: {
    events: {} as EventToggleFavorite,
  },
  on: {
    'FAVORITE.TOGGLE': {
      actions: [
        assign({
          favorites: (context, event) => {
            const isPokemonFavorite = context.favorites.find(
              (f) => f.name === event.newFavorite.name,
            );
            return isPokemonFavorite
              ? context.favorites.filter((f) => f.name !== event.newFavorite.name)
              : [...context.favorites, event.newFavorite];
          },
        }),
      ],
    },
  },
});
