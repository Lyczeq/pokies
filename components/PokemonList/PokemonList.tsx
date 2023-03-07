import { useActor } from '@xstate/react';
import { useCallback, useContext } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { PokemonsContext } from '../../contexts/PokemonsContext';
import { Pokemon } from '../../types/Pokemon';
import { PokemonListElement } from '../PokemonListElement/PokemonListElement';

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
      {state.matches('Pokemons loaded') && (
        <FlatList
          style={styles.container}
          data={state.context.pokemons}
          keyExtractor={({ name }) => name}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={() => send('loadMore')}
          // ListFooterComponent={
          //   state.matches('Loading Pokemons') && (
          //     <View style={{ margin: 80 }}>
          //       <ActivityIndicator />
          //     </View>
          //   )
          // }
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
