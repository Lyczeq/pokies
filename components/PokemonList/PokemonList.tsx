import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Pokemon } from '../../types/Pokemon';
import { PokemonListElement } from '../PokemonListElement/PokemonListElement';

type PokemonListProps = {
  pokemons: Pokemon[];
  isLoading?: boolean;
  getPokemons?: VoidFunction;
  navigation: any;
};

export const PokemonList = function ({
  navigation,
  pokemons,
  isLoading,
  getPokemons,
}: PokemonListProps) {
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={styles.container}
      data={pokemons}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => (
        <PokemonListElement pokemon={item} navigation={navigation} />
      )}
      onEndReachedThreshold={0.1}
      onEndReached={getPokemons}
      // ListFooterComponent={
      //   <View style={{ margin: 80 }}>
      //     <ActivityIndicator />
      //   </View>
      // }
    />
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
