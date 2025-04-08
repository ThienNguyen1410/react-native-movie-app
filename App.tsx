import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';
import { MovieProvider } from './src/contexts/MovieContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <MovieProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </MovieProvider>
    </SafeAreaProvider>
  );
}

export default App;
