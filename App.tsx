import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile';
import JobListingsScreen from './screens/JobListings';
import JobDetailScreen from './screens/JobDetail';
import AppliedJobsScreen from './screens/AppliedJobs';

// import './global.css';

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  function AuthStackScreens() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    );
  }
  function MainTabScreens() {
    return (
      <MainTab.Navigator>
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Profile" component={ProfileScreen} />
        <MainTab.Screen name="JobListings" component={JobListingsScreen} />
        <MainTab.Screen name="JobDetail" component={JobDetailScreen} />
        <MainTab.Screen name="AppliedJobs" component={AppliedJobsScreen} />
      </MainTab.Navigator>
    );
  }

  const isAuth = false;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isAuth ? <MainTabScreens /> : <AuthStackScreens />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
