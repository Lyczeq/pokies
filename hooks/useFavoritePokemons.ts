import { useActor } from '@xstate/react';
import { useContext } from 'react';
import { FavoritePokemonsContext } from '../contexts/FavoritePokemonsContext';
import { Pokemon } from '../types/Pokemon';

export const useFavoritePokemons = () => {
  const service = useContext(FavoritePokemonsContext);
  const [state, send] = useActor(service.favoritePokemonsService);

  const togglePokemonFromFavorites = (pokemon: Pokemon) => {
    send({ type: 'FAVORITE.TOGGLE', newFavorite: pokemon });
  };

  const isPokemonFavorite = (pokemonName: string) => {
    return !!state.context.favorites.find((f) => f.name === pokemonName);
  };

  return {
    favoritePokemons: state.context.favorites,
    togglePokemonFromFavorites,
    isPokemonFavorite,
  };
};
