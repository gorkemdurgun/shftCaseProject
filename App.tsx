import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

// import './global.css';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const routes: {
    route: string;
    title: string;
    icon: string;
  }[] = [
    {
      route: 'JobListings',
      title: 'Job Listings',
      icon: 'list',
    },
    {
      route: 'AppliedJobs',
      title: 'Applied Jobs',
      icon: 'list-check',
    },
    {
      route: 'Profile',
      title: 'Profile',
      icon: 'user',
    },
  ];

  function MyTabBar({state, descriptors, navigation}: any) {
    return (
      <View
        className="flex flex-row justify-between items-center p-4"
        style={{backgroundColor: colors.indigo[700]}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 justify-center items-center gap-y-1">
              <Icon
                name={routes[index].icon}
                size={20}
                color={isFocused ? colors.white : colors.indigo[300]}
              />
              <Text
                style={{
                  color: isFocused ? colors.white : colors.indigo[300],
                }}>
                {routes[index].title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="JobListings"
        component={JobListingsScreen}
        options={{
          headerLeft(props) {
            return (
              <View>
                <TouchableOpacity className="ml-4" onPress={() => {}}>
                  <Icon
                    name="right-from-bracket"
                    size={16}
                    style={{transform: [{rotate: '180deg'}]}}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobsScreen}
        options={{}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{}} />
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
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
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
