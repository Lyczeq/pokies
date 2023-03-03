import { useMachine, useSelector } from '@xstate/react';
import { favoritePokemonsMachine } from '../state/favoritePokemonsMachine';
import { Pokemon } from '../types/Pokemon';

export const useFavoritePokemons = () => {
  const [state, send] = useMachine(favoritePokemonsMachine);
  const togglePokemonFromFavorites = (pokemon: Pokemon) => {
    send({ type: 'FAVORITE.TOGGLE', newFavorite: pokemon });
  };

  const isPokemonFavorite = (pokemonName: string) => {
    return !!state.context.favorites.find(f => f.name === pokemonName);
  };

  console.log(state.context.favorites);

  return {
    favoritePokemons: state.context.favorites,
    togglePokemonFromFavorites,
    isPokemonFavorite,
  };
};
