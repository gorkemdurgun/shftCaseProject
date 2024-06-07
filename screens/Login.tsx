import React from 'react';
import {Button, Text, View} from 'react-native';

const LoginScreen: React.FC = ({navigation}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Go to Register Screen"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;
