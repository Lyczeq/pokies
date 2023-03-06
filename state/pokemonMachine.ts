import { assign, createMachine } from 'xstate';
import { Pokemon } from '../types/Pokemon';

type EventToggleFavorite = {
  type: 'FAVORITE.TOGGLE';
  newFavorite: Pokemon;
};

const loadPokemons = async (context) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${context.pokemons.length + 20}`,
  );
  const fetchedPokemons = await response.json();
  return {
    maxCount: fetchedPokemons.count,
    pokemons: fetchedPokemons.results,
  };
};

export const pokemonMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7AtFgIYDGAFgJa5gB0AMqkRFVAAQAKG2esAxBHlpUAblxppMOAsXJVaDJiw5cpsBCNQkiAFwp4A2gAYAukeOIUqWBV14LIAB6IAjADYArDQAs7gJwAOAGZ-f1cAdmd-MPcAGhAAT0RA3zCaACY03y9fNMjogF98uIluaVJKanpGZlw2TkkeXjAAJ2bUZvEAGx0AM3ascRU8QnK5KsVa5QbcNQ0tW1wzM3s0awX7JwQ0sNSwj1c02ITEf2cad0LiobLZSvrS2FZO6sheZ6YAWXawZaQQVZselwG0QuX8NGcYUMO1cgXCeSOiS2oRo0R8blchmc7gOFyK-2uI1utHuqieLwgvG0qCgUE6YAAYkRRM0bD8TCsrIC7H9Nu5DJ5-GlXF43FicYc4kjtmdfNDDLD-IY0oYgoFCvjcKgIHBOdMiRUwJy1kCQQh8D4aIZDL53LkvP4vIFolLEPhXJcCfqZIbxjU6td4H8AeteaCaL45V4wv53Njca6ELbzs5ApFAn5nXirt7RndA+SmJBjdzgWGEMlAhG3PzkgrJccEJCq4dbaKhVltgrPSUpAaxgp-VMHqwekQKPSICXQ6BNrDUtCIg6nS7G3KaHCoYYnVl3GnDhr8kA */
    id: 'pokemon-machine',
    predictableActionArguments: true,
    schema: {
      services: {} as {
        loadPokemons: {
          data: { pokemons: Pokemon[]; maxCount: number };
        };
      },
      events: {} as { type: 'toggleFavorite'; favoriteToToggle: Pokemon } | { type: 'loadMore' },
    },
    initial: 'Loading Pokemons',
    context: {
      pokemons: [] as Pokemon[],
      errorMessage: undefined as string | undefined,
      favoritePokemons: [] as Pokemon[],
      moreToLoad: false,
    },
    tsTypes: {} as import('./pokemonMachine.typegen').Typegen0,
    states: {
      'Loading Pokemons': {
        invoke: {
          src: 'loadPokemons',
          onDone: [
            {
              target: 'Pokemons loaded',
              actions: 'assignPokemonsToContext',
            },
          ],
          onError: [
            {
              target: 'Loading Pokemons failed',
              actions: 'assignErrorToContext',
            },
          ],
        },
      },
      'Pokemons loaded': {
        on: {
          loadMore: 'Loading Pokemons',
          toggleFavorite: {
            actions: 'togglePokemonInFavorite',
          },
        },
      },

      'Loading Pokemons failed': {},
    },
  },
  {
    services: {
      loadPokemons,
    },
    actions: {
      togglePokemonInFavorite: assign({
        favoritePokemons: (context, event) => {
          const isPokemonFavorite = context.favoritePokemons.find(
            (f) => f.name === event.favoriteToToggle.name,
          );
          return isPokemonFavorite
            ? context.favoritePokemons.filter((f) => f.name !== event.favoriteToToggle.name)
            : [...context.favoritePokemons, event.favoriteToToggle];
        },
      }),

      assignPokemonsToContext: assign((context, event) => {
        return {
          pokemons: event.data.pokemons,
          moreToLoad: context.pokemons.length < event.data.maxCount,
        };
      }),
      assignErrorToContext: assign(() => {
        return {
          errorMessage: 'Something went wrong, try to refresh to load pokemons again.',
        };
      }),
    },
  },
);

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
