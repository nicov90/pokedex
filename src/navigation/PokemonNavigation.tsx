import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Pokedex from '../screens/Pokedex';
import PokemonPage from '../screens/PokemonPage';
import FavoritesManager from '../components/Favorites/FavoritesManager';

const Stack = createNativeStackNavigator();

export default function PokemonNavigation() {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Pokedex' component={Pokedex} options={{
        headerTitle: 'Pokedex',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}/>
      <Stack.Screen name='Pokemon' component={PokemonPage} options={{
        headerTransparent: true,
        headerShown: true,
        headerShadowVisible: false,
        headerRight: () => <FavoritesManager />,
      }}/>
    </Stack.Navigator>
  )
}