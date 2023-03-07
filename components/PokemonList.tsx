import { useActor } from '@xstate/react';
import { useCallback, useContext } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { PokemonsContext } from '../contexts/PokemonsContext';
import { Pokemon } from '../types/Pokemon';
import { PokemonListElement } from './PokemonListElement';

export const PokemonList = function () {
  const pokemonsService = useContext(PokemonsContext);
  const [state, send] = useActor(pokemonsService.pokemonService);

  const renderItem = useCallback(
    ({ item }: { item: Pokemon }) => <PokemonListElement pokemon={item} key={item.name} />,
    [],
  );

  return (
    <>
      {state.matches('Loading Pokemons') && <ActivityIndicator />}
      {state.matches('Loading Pokemons failed') && <Text>{state.context.errorMessage}</Text>}
      {state.context.pokemons.length > 0 && (
        <FlatList
          style={styles.container}
          data={state.context.pokemons}
          keyExtractor={({ name }) => name}
          renderItem={renderItem}
          onEndReachedThreshold={0.2}
          onEndReached={() => send('loadMore')}
          ListFooterComponent={
            state.matches('Load more Pokemons') && (
              <View style={{ marginBottom: 80 }}>
                <ActivityIndicator />
              </View>
            )
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30,
    marginBottom: 10,
  },
});
