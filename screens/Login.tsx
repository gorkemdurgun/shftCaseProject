import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {authServices} from '../services/auth';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/userSlice';
import colors from 'tailwindcss/colors';
import Snackbar from 'react-native-snackbar';

const LoginScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = React.useState<LoginRequest>({
    email: 'test@test.com',
    password: 'password',
  });
  // const [loading, setLoading] = React.useState<boolean>(false);

  const {
    mutate: loginMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: authServices.login,
    onSuccess: data => {
      console.log(data.accessToken);
      dispatch(
        setUser({
          user: data.user,
          token: data.accessToken,
        }),
      );
    },
    onError: error => {
      Snackbar.show({
        text: error.message,
        duration: 3000,
        backgroundColor: colors.red[500],
        textColor: colors.white,
      });
    },
  });

  function handleLogin() {
    // setLoading(true);
    loginMutation(loginForm);
  }

  return (
    <View className="flex-1 justify-center items-start p-4 bg-gray-300">
      {/* Welcome Text */}
      <View className="w-full flex justify-start items-start mb-12">
        <Text className="text-2xl font-bold">Welcome,</Text>
        <Text className="text-4xl font-bold">ACME App</Text>
      </View>
      {/* Login Form */}
      <View className="w-full flex justify-center items-center mb-12">
        <View className="w-full flex justify-start items-start gap-y-1 mb-2">
          <Text className="text-black font-semibold">Email</Text>
          <TextInput
            keyboardType="email-address"
            className="w-full border p-2 rounded-md"
            style={{borderColor: isError ? 'red' : colors.indigo[900]}}
            placeholder="Email"
            value={loginForm.email}
            onChangeText={text => setLoginForm({...loginForm, email: text})}
          />
        </View>
        <View className="w-full flex justify-start items-start gap-y-1 mb-2">
          <Text className="text-black font-semibold">Password</Text>
          <TextInput
            keyboardType="visible-password"
            className="w-full border p-2 rounded-md"
            style={{borderColor: isError ? 'red' : colors.indigo[900]}}
            placeholder="Password"
            value={loginForm.password}
            onChangeText={text => setLoginForm({...loginForm, password: text})}
          />
        </View>
        <TouchableOpacity
          disabled={isPending}
          className="w-full flex justify-center items-center p-2 shadow-md rounded-md"
          style={{
            marginTop: 8,
            backgroundColor: colors.indigo[800],
          }}
          onPress={handleLogin}>
          {isPending ? (
            <ActivityIndicator
              color={colors.white}
              className="p-1"
              size="small"
              animating={true}
            />
          ) : (
            <Text className="text-lg text-white">Login</Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Register Section */}
      <View className="w-full flex justify-center items-center">
        <Text className="text-indigo-900">Don't have an account?</Text>
        <TouchableOpacity
          className="w-full flex justify-center items-center p-2 shadow-lg rounded-lg"
          style={{
            marginTop: 8,
            backgroundColor: colors.indigo[300],
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text className="text-lg text-indigo-900">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
