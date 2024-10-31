import React from 'react';
import { Provider } from 'react-redux';
import store from './screens/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import TodoScreen from './screens/TodoScreen';
import SecondScreen from './screens/SecondScreen';
import WelcomeScreen from './screens/WelcomeScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen name="TodoScreen" component={TodoScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
