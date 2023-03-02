import { useGetPokemons } from './usePokemonList';
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  View,
} from 'react-native';

export const PokemonList = function () {
  const { pokemons, isLoading, getPokemons, moreLoading } = useGetPokemons();

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={styles.container}
      data={pokemons}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      onEndReachedThreshold={0.1}
      onEndReached={getPokemons}
      ListFooterComponent={
        <View>
          <ActivityIndicator />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
