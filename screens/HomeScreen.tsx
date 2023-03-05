import { StyleSheet, View } from 'react-native';
import { PokemonList } from '../components/PokemonList/PokemonList';
import { useGetPokemons } from '../hooks/usePokemonList';

export function HomeScreen() {
  const { pokemons, isLoading, getPokemons } = useGetPokemons();

  return (
    <View style={styles.container}>
      <PokemonList pokemons={pokemons} isLoading={isLoading} getPokemons={getPokemons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
