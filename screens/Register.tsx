import React from 'react';
import {Button, Text, View} from 'react-native';

const RegisterScreen: React.FC = ({navigation}) => {
  return (
    <View>
      <Text>RegisterScreen</Text>
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;
