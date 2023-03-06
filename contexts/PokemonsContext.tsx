import { useInterpret } from '@xstate/react';
import { createContext } from 'react';
import { pokemonMachine } from '../state/pokemonMachine';

type PokemonContextProvider = {
  pokemonService: {
    id: string;
  };
};

export const PokemonsContext = createContext<PokemonContextProvider>({
  pokemonService: {
    id: '',
  },
});

export const PokemonsContextProvider = ({ children }) => {
  const pokemonService = useInterpret(pokemonMachine);

  return <PokemonsContext.Provider value={{ pokemonService }}>{children}</PokemonsContext.Provider>;
};
