import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, Animated} from 'react-native';

import useAppSelector from '../hooks/useAppSelector';

const SplashScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const token = useAppSelector(state => state.user.token);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigation.navigate('Main', {screen: 'JobListings'});
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }, [token, navigation]);

  const bounceValue = new Animated.Value(0);
  Animated.loop(
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        style={{
          transform: [
            {
              translateY: bounceValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, 20, 0],
              }),
            },
          ],
        }}
        className="flex items-center justify-center bg-blue-100 rounded-full h-48 w-48">
        <Animated.Text className="font-bold text-4xl text-blue-500">
          ACME
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
