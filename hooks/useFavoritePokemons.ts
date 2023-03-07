import { useActor } from '@xstate/react';
import { useContext } from 'react';
import { PokemonsContext } from './../contexts/PokemonsContext';
import { Pokemon } from './../types/Pokemon';

export const useFavoritePokemons = () => {
  const pokemonsService = useContext(PokemonsContext);
  const [state, send] = useActor(pokemonsService.pokemonService);

  const togglePokemonFromFavorites = (pokemon: Pokemon) => {
    send({ type: 'toggleFavorite', favoriteToToggle: pokemon });
  };

  const isPokemonFavorite = (pokemonName: string) => {
    return !!state.context.favoritePokemons.find((f) => f.name === pokemonName);
  };

  return {
    togglePokemonFromFavorites,
    isPokemonFavorite,
  };
};
