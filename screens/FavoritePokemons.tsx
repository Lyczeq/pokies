import { useActor } from '@xstate/react';
import { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PokemonListElement } from '../components/PokemonListElement/PokemonListElement';
import { PokemonsContext } from '../contexts/PokemonsContext';
import { Pokemon } from '../types/Pokemon';
// import { useFavoritePokemons } from '../hooks/useFavoritePokemons';

export function FavoritePokemons() {
  const pokemonsService = useContext(PokemonsContext);
  const [state, send] = useActor(pokemonsService.pokemonService);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => <PokemonListElement pokemon={item} key={item.name} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.context.favoritePokemons}
        keyExtractor={({ name }) => name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
