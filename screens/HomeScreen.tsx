import { StyleSheet, View } from 'react-native';
import { PokemonList } from '../components/tPokemonList';
// import { PokemonList } from '../components/PokemonList/PokemonList';

export function HomeScreen() {
  // const { pokemons, isLoading, getPokemons } = useGetPokemons();

  return (
    <View style={styles.container}>
      <PokemonList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
