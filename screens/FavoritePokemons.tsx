import { StyleSheet, View } from 'react-native';
import { PokemonList } from '../components/PokemonList/PokemonList';
import { useFavoritePokemons } from '../hooks/useFavoritePokemons';

export function FavoritePokemons() {
  const { favoritePokemons } = useFavoritePokemons();
  return (
    <View style={styles.container}>
      <PokemonList pokemons={favoritePokemons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
