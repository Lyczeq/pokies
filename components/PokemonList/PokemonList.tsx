import { useGetPokemons } from './usePokemonList';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Button,
} from 'react-native';

export const PokemonList = function ({ navigation }) {
  const { pokemons, isLoading, getPokemons } = useGetPokemons();

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={styles.container}
      data={pokemons}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => (
        <Button
          title={item.name}
          onPress={() => {
            navigation.push('pokemon-details', {
              name: item.name,
              url: item.url,
            });
          }}
        ></Button>
      )}
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
  pokemon: {

  },
});
