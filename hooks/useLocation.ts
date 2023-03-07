import * as Location from 'expo-location';
import { useEffect, useReducer, useState } from 'react';
import { Region } from 'react-native-maps';

const initialLocation = {
  longitude: 0,
  latitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const handleLocationState = (state: Region, action) => {
  switch (action.type) {
    case 'CURRENT_LOCATION': {
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    }
    case 'INCREMENT_LATITUDE': {
      return {
        ...state,
        latitude: state.latitude + 0.005,
      };
    }
    case 'DECREMENT_LATITUDE': {
      return {
        ...state,
        latitude: state.latitude - 0.005,
      };
    }
    case 'INCREMENT_LONGITUDE': {
      return {
        ...state,
        longitude: state.longitude + 0.005,
      };
    }
    case 'DECREMENT_LONGITUDE': {
      return {
        ...state,
        longitude: state.longitude - 0.005,
      };
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export const useLocation = () => {
  const [location, dispatch] = useReducer(handleLocationState, initialLocation);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      dispatch({
        type: 'CURRENT_LOCATION',
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
    })();
  }, []);

  return {
    dispatch,
    errorMessage,
    location,
  };
};
