import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { PokemonDetails } from './screens/PokemonDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FavoritePokemons } from './screens/FavoritePokemons';
import { createContext } from 'react';
import { favoritePokemonsMachine } from './state/favoritePokemonsMachine';
import { useInterpret } from '@xstate/react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type FavoritePokemonsContextProvider = {
  favoritePokemonsService: {
    id: string;
  };
};
export const FavoritePokemonsContext =
  createContext<FavoritePokemonsContextProvider>({
    favoritePokemonsService: {
      id: '',
    },
  });

const FavoritePokemonsContextProvider = ({ children }) => {
  const favoritePokemonsService = useInterpret(favoritePokemonsMachine);
  return (
    <FavoritePokemonsContext.Provider value={{ favoritePokemonsService }}>
      {children}
    </FavoritePokemonsContext.Provider>
  );
};

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Pokemons',
          tabBarIcon: ({ focused }) => {
            const color = focused === true ? 'blue' : 'grey';
            return <Ionicons name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritePokemons}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => {
            const color = focused === true ? 'red' : 'grey';
            return <Ionicons name="heart" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <FavoritePokemonsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="pokemon-details"
            component={PokemonDetails}
            options={({ route }) => ({ title: route.params?.name})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritePokemonsContextProvider>
  );
}
