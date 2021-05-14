
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {MapMainMenu} from '../screens';
import { MapStackParamList } from '../types/navigation';


export function AppContainer() {
    const MapStack = createStackNavigator<MapStackParamList>()
  return (
    <MapStack.Navigator
        initialRouteName='MapMainMenu'
        mode={'modal'}
        screenOptions={{
            headerShown: false,
            headerTitle: ''
        }}
    >
        <MapStack.Screen
            name="MapMainMenu"
            component={MapMainMenu}
            options={{
                headerShown: false,
            }}
        />
    </MapStack.Navigator>
)
}