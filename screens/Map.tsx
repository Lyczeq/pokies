import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useGetSinglePokemon } from '../hooks/useGetSinglePokemon';
import { useLocation } from '../hooks/useLocation';

const PIKACHU_URL = 'https://pokeapi.co/api/v2/pokemon/pikachu';

export function Map() {
  const { location, dispatch } = useLocation();
  const { pokemon } = useGetSinglePokemon(PIKACHU_URL);
  const mapRef: React.MutableRefObject<MapView> = useRef();
  const imageUrl = pokemon?.sprites['front_default'];

  const jumpToCurrentLocation = () => {
    mapRef.current.animateToRegion(location);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.mapView} region={location} showsMyLocationButton ref={mapRef}>
        <Marker coordinate={location} style={styles.marker}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Marker>
        <View style={styles.iconsContainer}>
          <Ionicons name="locate-outline" size={64} color="grey" onPress={jumpToCurrentLocation} />
          <Ionicons
            name="arrow-up"
            size={32}
            color="black"
            onPress={() => dispatch({ type: 'INCREMENT_LATITUDE' })}
          />
          <Ionicons
            name="arrow-forward"
            size={32}
            color="black"
            onPress={() => dispatch({ type: 'INCREMENT_LONGITUDE' })}
          />
          <Ionicons
            name="arrow-back"
            color="black"
            size={32}
            onPress={() => dispatch({ type: 'DECREMENT_LONGITUDE' })}
          />
          <Ionicons
            name="arrow-down"
            color="black"
            size={32}
            onPress={() => dispatch({ type: 'DECREMENT_LATITUDE' })}
          />
        </View>
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
  iconsContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mapView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
