import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/tab-navigator';
import { MovieProvider } from './src/contexts/movie-context';
import { WatchlistProvider } from './src/contexts/watch-list-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <WatchlistProvider>
        <MovieProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </MovieProvider>
      </WatchlistProvider>
    </SafeAreaProvider>
  );
}

export default App;
