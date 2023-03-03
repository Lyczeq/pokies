import { StyleSheet, View } from 'react-native';
import { PokemonList } from '../components/PokemonList/PokemonList';
import { useFavoritePokemons } from '../hooks/useFavoritePokemons';

export function FavoritePokemons({ navigation }) {
  const { favoritePokemons } = useFavoritePokemons();
  console.log({ favoritePokemons });
  return (
    <View style={styles.container}>
      <PokemonList navigation={navigation} pokemons={favoritePokemons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
