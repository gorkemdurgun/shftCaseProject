import React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {authServices} from '../services/auth';
import {useMutation} from '@tanstack/react-query';
import {setLoggedUser} from '../redux/slices/userSlice';
import colors from 'tailwindcss/colors';
import Snackbar from 'react-native-snackbar';
import useAppDispatch from '../hooks/useAppDispatch';
import {Controller, useForm} from 'react-hook-form';
import {TranslatedText} from '../components';

const LoginScreen: React.FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const {
    mutate: loginMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: authServices.login,
    onSuccess: data => {
      dispatch(
        setLoggedUser({
          loggedUser: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
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

  function onSubmit(data: any) {
    loginMutation(data);
  }

  return (
    <View className="flex-1 justify-center items-start p-4 bg-gray-300">
      {/* Welcome Text */}
      <View className="w-full flex justify-start items-start mb-12">
        <TranslatedText
          className="text-2xl font-bold"
          text="screen.login.welcome"
        />
        <Text className="text-4xl font-bold">ACME App</Text>
      </View>
      {/* Login Form */}
      <View className="w-full flex justify-center items-center mb-12">
        <View className="w-full flex justify-start items-start gap-y-1 mb-4">
          <TranslatedText
            className="text-black font-semibold"
            text="screen.login.email"
          />
          <Controller
            control={control}
            name="email"
            rules={{required: 'Email is required'}}
            render={({field}) => (
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                className="w-full border p-2 mt-1 rounded-md"
                style={{borderColor: errors.email ? 'red' : colors.indigo[900]}}
                placeholder="Email"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </Text>
          )}
        </View>
        <View className="w-full flex justify-start items-start gap-y-1 mb-4">
          <TranslatedText
            className="text-black font-semibold"
            text="screen.login.password"
          />
          <Controller
            control={control}
            name="password"
            rules={{required: 'Password is required'}}
            render={({field}) => (
              <TextInput
                autoCapitalize="none"
                keyboardType="visible-password"
                className="w-full border p-2 mt-1 rounded-md"
                style={{
                  borderColor: errors.password ? 'red' : colors.indigo[900],
                }}
                placeholder="Password"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </Text>
          )}
        </View>
        <TouchableOpacity
          id="login-button"
          disabled={isPending}
          className="w-full flex justify-center items-center p-2 shadow-md rounded-md"
          style={{
            marginTop: 8,
            backgroundColor: colors.indigo[800],
          }}
          onPress={() => handleSubmit(onSubmit)()}>
          {isPending ? (
            <ActivityIndicator
              color={colors.white}
              className="p-1"
              size="small"
              animating={true}
            />
          ) : (
            <TranslatedText
              className="text-lg text-indigo-100"
              text="screen.login.login"
            />
          )}
        </TouchableOpacity>
      </View>
      {/* Register Section */}
      <View className="w-full flex justify-center items-center">
        <TranslatedText
          className="text-md text-indigo-900"
          text="screen.login.noAccount"
        />
        <TouchableOpacity
          className="w-full flex justify-center items-center p-2 shadow-lg rounded-lg"
          style={{
            marginTop: 8,
            backgroundColor: colors.indigo[300],
          }}
          onPress={() => navigation.navigate('Register')}>
          <TranslatedText
            className="text-lg text-indigo-700"
            text="screen.login.register"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
