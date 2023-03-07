import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useActor } from '@xstate/react';
import React, { memo, useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { PokemonsContext } from '../../contexts/PokemonsContext';
import { Pokemon } from '../../types/Pokemon';

export const PokemonListElement = memo(({ pokemon }: { pokemon: Pokemon }) => {
  const { navigate } = useNavigation();
  const pokemonsService = useContext(PokemonsContext);
  const [state, send] = useActor(pokemonsService.pokemonService);

  const navigateToPokemonDetails = (item: Pokemon) => {
    navigate('pokemon-details', {
      name: item.name,
      url: item.url,
    });
  };

  const isPokemonFavorite = state.context.favoritePokemons.find((fp) => fp.name === pokemon.name)
    ? 'heart'
    : 'hearto';

  return (
    <View style={styles.listElement}>
      <Button title={pokemon.name} onPress={() => navigateToPokemonDetails(pokemon)} />
      <AntDesign
        name={isPokemonFavorite}
        size={24}
        color="red"
        onPress={() => send({ type: 'toggleFavorite', favoriteToToggle: pokemon })}
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
