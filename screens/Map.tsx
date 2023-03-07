import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useGetSinglePokemon } from '../hooks/useGetSinglePokemon';
import { useLocation } from '../hooks/useLocation';

const PIKACHU_URL = 'https://pokeapi.co/api/v2/pokemon/pikachu';

export function Map() {
  const { location, errorMessage } = useLocation();
  const { pokemon, isLoading } = useGetSinglePokemon(PIKACHU_URL);
  const imageUrl = pokemon?.sprites['front_default'];

  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} initialRegion={location}>
        <Marker coordinate={location} style={styles.marker}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    width: '15%',
    height: '15%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
});
