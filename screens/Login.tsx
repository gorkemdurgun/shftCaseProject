import React, {useEffect} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {authServices} from '../services/auth';
import {useMutation} from '@tanstack/react-query';

const LoginScreen: React.FC = ({navigation}) => {
  const [loginForm, setLoginForm] = React.useState<LoginRequest>({
    email: 'test@test.com',
    password: 'password',
  });

  const loginMutation = useMutation({
    mutationFn: authServices.login,
    onSuccess: data => {
      navigation.navigate('Register');
    },
    onError: error => {
      console.log(error);
    },
  });

  function handleLogin() {
    loginMutation.mutate(loginForm);
  }

  useEffect(() => {
    loginMutation.reset();
  }, []);

  return (
    <View>
      <Text>LoginScreen</Text>
      <TextInput
        placeholder="Email"
        onChangeText={text => setLoginForm({...loginForm, email: text})}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => setLoginForm({...loginForm, password: text})}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register Screen"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;
