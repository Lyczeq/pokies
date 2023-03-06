import { useInterpret } from '@xstate/react';
import { createContext } from 'react';
import { favoritePokemonsMachine } from '../state/pokemonMachine';

type FavoritePokemonsContextProvider = {
  favoritePokemonsService: {
    id: string;
  };
};

export const FavoritePokemonsContext = createContext<FavoritePokemonsContextProvider>({
  favoritePokemonsService: {
    id: '',
  },
});

export const FavoritePokemonsContextProvider = ({ children }) => {
  const favoritePokemonsService = useInterpret(favoritePokemonsMachine);
  return (
    <FavoritePokemonsContext.Provider value={{ favoritePokemonsService }}>
      {children}
    </FavoritePokemonsContext.Provider>
  );
};
