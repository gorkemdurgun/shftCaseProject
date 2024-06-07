import React from 'react';
import {Button, Text, View} from 'react-native';

const LoginScreen: React.FC = ({navigation}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default LoginScreen;
