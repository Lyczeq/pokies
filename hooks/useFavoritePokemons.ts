import { useActor } from '@xstate/react';
import { useContext } from 'react';
import { FavoritePokemonsContext } from '../App';
import { Pokemon } from '../types/Pokemon';

export const useFavoritePokemons = () => {
  const service = useContext(FavoritePokemonsContext);
  const [state, send] = useActor(service.favoritePokemonsService);

  const togglePokemonFromFavorites = (pokemon: Pokemon) => {
    send({ type: 'FAVORITE.TOGGLE', newFavorite: pokemon });
  };
  console.log({ state });
  const isPokemonFavorite = (pokemonName: string) => {
    // return true;
    return !!state.context.favorites.find(f => f.name === pokemonName);
  };

  console.log(state.context.favorites);

  return {
    favoritePokemons: state.context.favorites,
    togglePokemonFromFavorites,
    isPokemonFavorite,
  };
};
