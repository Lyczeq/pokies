import { useMachine } from '@xstate/react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { pokemonMachine } from '../state/pokemonMachine';
import { Pokemon } from '../types/Pokemon';
import { PokemonListElement } from './PokemonListElement/PokemonListElement';

type PokemonListProps = {
  pokemons: Pokemon[];
  isLoading?: boolean;
  getPokemons?: VoidFunction;
};

export const PokemonList = function () {
  const [state, send] = useMachine(pokemonMachine);

  return (
    <>
      {state.matches('Loading Pokemons') && <ActivityIndicator />}
      {state.matches('Loading Pokemons failed') && <Text>{state.context.errorMessage}</Text>}
      {state.matches('Pokemons loaded') && (
        <FlatList
          style={styles.container}
          data={state.context.pokemons}
          keyExtractor={({ name }) => name}
          renderItem={({ item }) => <PokemonListElement pokemon={item} />}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            send({
              type: 'loadMore',
            })
          }
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
