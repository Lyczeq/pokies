import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PokemonsContextProvider } from './contexts/PokemonsContext';
import { FavoritePokemons } from './screens/FavoritePokemons';
import { HomeScreen } from './screens/HomeScreen';
import { PokemonDetails } from './screens/PokemonDetails';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
    <PokemonsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen
            name="pokemon-details"
            component={PokemonDetails}
            options={({ route }) => ({ title: route.params?.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PokemonsContextProvider>
  );
}
