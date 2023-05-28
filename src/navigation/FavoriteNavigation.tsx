import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavoritesManager from '../components/Favorites/FavoritesManager';
import Favorite from '../screens/Favorite';
import PokemonPage from '../screens/PokemonPage';

const Stack = createNativeStackNavigator();

export default function FavoriteNavigation() {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Favorite' component={Favorite} options={{
        headerTitle: 'Favorites',
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name='Pokemon' component={PokemonPage} options={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerRight: () => <FavoritesManager />,
      }}/>
    </Stack.Navigator>
  )
}