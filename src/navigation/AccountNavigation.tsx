import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Register';
import { useSelector } from 'react-redux';
import Login from '../screens/Login';
import ProfileNavigation from '../navigation/ProfileNavigation';

const Stack = createNativeStackNavigator();

export default function AccountNavigation() {
  const {auth} = useSelector((state: any) => state.account);

  return (
    <Stack.Navigator initialRouteName={auth ? 'ProfileNavigation' : 'Login'}>
      <Stack.Screen name='Login' component={Login} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name='ProfileNavigation' component={ProfileNavigation} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name='Register' component={Register} options={{
        headerTransparent: true,
        headerTitle: "",
      }}/>
    </Stack.Navigator>
  )
}