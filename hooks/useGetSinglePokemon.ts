import { useEffect, useState } from 'react';
import { Pokemon } from '../types/Pokemon';

export const useGetSinglePokemon = (url: string) => {
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemon = async () => {
    try {
      const response = await fetch(url);
      const fetchedPokemon = await response.json();
      setPokemon(fetchedPokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return { pokemon, isLoading };
};
