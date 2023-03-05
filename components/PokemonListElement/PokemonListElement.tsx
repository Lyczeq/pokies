import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useFavoritePokemons } from '../../hooks/useFavoritePokemons';
import { Pokemon } from '../../types/Pokemon';

export const PokemonListElement = memo(({ pokemon }: { pokemon: Pokemon }) => {
  const { navigate } = useNavigation();
  const { togglePokemonFromFavorites, isPokemonFavorite } = useFavoritePokemons();

  const navigateToPokemonDetails = (item: Pokemon) => {
    navigate('pokemon-details', {
      name: item.name,
      url: item.url,
    });
  };

  const handleIconFavorite = (pokemonName: string) => {
    return isPokemonFavorite(pokemonName) ? 'heart' : 'hearto';
  };

  return (
    <View style={styles.listElement}>
      <Button title={pokemon.name} onPress={() => navigateToPokemonDetails(pokemon)} />
      <AntDesign
        name={handleIconFavorite(pokemon.name)}
        size={24}
        color="red"
        onPress={() => togglePokemonFromFavorites(pokemon)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  listElement: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
});
