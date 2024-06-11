import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ProfileScreen from './screens/Profile';
import JobListingsScreen from './screens/JobListings';
import JobDetailScreen from './screens/JobDetail';
import AppliedJobsScreen from './screens/AppliedJobs';
import {Provider as ReduxProvider, useSelector} from 'react-redux';
import store, {persistor} from './redux/store';
import SplashScreen from './screens/Splash';
import {PersistGate} from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from 'tailwindcss/colors';
import useAppSelector from './hooks/useAppSelector';
import useAppDispatch from './hooks/useAppDispatch';
import {clearUser} from './redux/slices/userSlice';
import BottomTabBar from './components/BottomTabBar';
import {Stack, Tab, useAppNavigation} from './hooks/useAppNavigation';

if (__DEV__) {
  require('./ReactotronConfig');
}

function MainTabNavigator() {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen
        name="JobListings"
        component={JobListingsScreen}
        options={{
          headerLeft(props) {
            return (
              <TouchableOpacity
                className="ml-4"
                onPress={() => dispatch(clearUser())}>
                <Icon
                  name="right-from-bracket"
                  size={16}
                  style={{transform: [{rotate: '180deg'}]}}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobsScreen}
        options={{
          headerLeft(props) {
            return (
              <TouchableOpacity
                className="ml-4"
                onPress={() =>
                  navigation.navigate('Main', {screen: 'JobListings'})
                }>
                <Icon name="arrow-left" size={16} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft(props) {
            return (
              <TouchableOpacity
                className="ml-4"
                onPress={() =>
                  navigation.navigate('Main', {
                    screen: 'JobListings',
                  })
                }>
                <Icon name="arrow-left" size={16} />
              </TouchableOpacity>
            );
          },
          headerRight(props) {
            return (
              <TouchableOpacity
                className="mr-4"
                onPress={() => dispatch(clearUser())}>
                <Icon name="right-from-bracket" size={16} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="JobDetail"
        component={JobDetailScreen}
        initialParams={{jobId: ''}}
        options={{
          tabBarButton: () => null,
          headerLeft(props) {
            return (
              <TouchableOpacity
                className="ml-4"
                onPress={() =>
                  navigation.navigate('Main', {
                    screen: 'JobListings',
                  })
                }>
                <Icon name="arrow-left" size={16} />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  function AppNavigator() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.user.token);

    useEffect(() => {
      console.log('active access token', token);
    }, [token]);

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splash">
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
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
