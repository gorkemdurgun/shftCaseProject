import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabParamList, RootStackParamList} from '../types/navigation';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const Tab = createBottomTabNavigator<MainTabParamList>();
