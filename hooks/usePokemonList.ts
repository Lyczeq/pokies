import { useEffect, useState } from 'react';
import { Pokemon } from '../types/Pokemon';

export const useGetPokemons = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${pokemons.length + 20}`,
      );
      const fetchedPokemons = await response.json();
      setPokemons(fetchedPokemons.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('x');

  useEffect(() => {
    getPokemons();
  }, []);

  return {
    pokemons,
    isLoading,
    getPokemons,
  };
};
