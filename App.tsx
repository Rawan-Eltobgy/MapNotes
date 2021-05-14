import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import {AppContainer} from './src/router';
import { MapMainMenu } from './src/screens';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      {
          <AppContainer />
      }
    </NavigationContainer>
  );
};

export default App;