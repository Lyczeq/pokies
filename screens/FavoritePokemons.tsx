import { useActor } from '@xstate/react';
import { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PokemonListElement } from '../components/PokemonListElement';
import { PokemonsContext } from '../contexts/PokemonsContext';
import { Pokemon } from '../types/Pokemon';

export function FavoritePokemons() {
  const pokemonsService = useContext(PokemonsContext);
  const [state] = useActor(pokemonsService.pokemonService);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => <PokemonListElement pokemon={item} key={item.name} />,
    [],
  );

  return (
    <View style={styles.container}>
      {state.context.favoritePokemons.length === 0 ? (
        <Text style={styles.emptyListMessage}>Your favorite pokemon list is empty</Text>
      ) : (
        <FlatList
          data={state.context.favoritePokemons}
          keyExtractor={({ name }) => name}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyListMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});
