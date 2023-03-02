import { Pokemon } from './../../types/Pokemon';
import { useEffect, useState } from 'react';

export const useGetPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moreLoading, setIsMoreLoading] = useState(true);

  const getPokemons = async () => {
    setIsMoreLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pokemons.length + 10}`
      );
      const fetchedPokemons = await response.json();
      setPokemons(fetchedPokemons.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {
    moreLoading,
    pokemons,
    isLoading,
    getPokemons,
  };
};
