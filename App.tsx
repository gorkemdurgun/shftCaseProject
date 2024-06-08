import React, {useEffect} from 'react';
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
import {Provider as ReduxProvider, useDispatch, useSelector} from 'react-redux';
import store, {persistor} from './redux/store';
import SplashScreen from './screens/Splash';
import {PersistGate} from 'redux-persist/integration/react';

// import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="JobListings" component={JobListingsScreen} />
      <Tab.Screen name="JobDetail" component={JobDetailScreen} />
      <Tab.Screen name="AppliedJobs" component={AppliedJobsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  function AppNavigator() {
    const token = useSelector(state => state.user);

    useEffect(() => {
      console.log(token);
    }, [token]);

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  const queryClient = new QueryClient();

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
