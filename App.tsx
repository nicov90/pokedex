import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'}/>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}