import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';

// import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitle: '',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitle: 'Title',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{title: 'Home'}}
        />
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{title: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
