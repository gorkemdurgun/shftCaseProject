import React from 'react';
import {Button, Text, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text className="text-2xl font-bold text-center text-blue-500">
        HomeScreen
      </Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default HomeScreen;
