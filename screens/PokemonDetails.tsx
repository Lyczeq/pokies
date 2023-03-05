import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const useGetSinglePokemon = (url: string) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemon = async () => {
    try {
      const response = await fetch(url);
      const fetchedPokemon = await response.json();
      setPokemon(fetchedPokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return { pokemon, isLoading };
};

export function PokemonDetails({ route }) {
  const { pokemon, isLoading } = useGetSinglePokemon(route.params.url);
  const stats = (pokemon?.stats ?? []).map((p) => ({
    name: p.stat.name,
    number: p['base_stat'],
  }));

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Image style={styles.image} source={{ uri: pokemon.sprites['front_default'] }} />
          <View style={styles.stats}>
            {stats.map((s) => (
              <View style={styles.statsChild} key={s.name}>
                <Text>{s.name}</Text>
                <Text>{s.number}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
  stats: {
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    // borderColor: '#888',
    // borderWidth: 1,
  },
  statsChild: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 5,
    flexGrow: 1,
    flexBasis: '33%',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: '700',
  },
});
