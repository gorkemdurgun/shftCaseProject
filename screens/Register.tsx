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
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/slices/userSlice';
import colors from 'tailwindcss/colors';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/AntDesign';

const RegisterScreen: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();

  const [registerForm, setRegisterForm] = React.useState<RegisterRequest>({
    email: 'test@test.com',
    password: 'password',
  });

  const {
    mutate: registerMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: authServices.register,
    onSuccess: data => {
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

  return (
    <View className="flex-1 justify-start items-start p-4 bg-gray-300">
      {/* Go Back */}
      <TouchableOpacity
        className="flex flex-row justify-start items-center gap-x-1 mt-16 mb-4"
        onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={20} color={colors.indigo[900]} />
      </TouchableOpacity>
      {/* Title */}
      <Text className="text-2xl text-black font-bold mb-4">Create Account</Text>
      {/* Register Form */}
      <View className="w-full flex justify-center items-center mb-12">
        <View className="w-full flex justify-start items-start gap-y-1 mb-4">
          <Text className="text-black font-semibold">Email</Text>
          <TextInput
            keyboardType="email-address"
            className="w-full border p-2 rounded-md"
            style={{borderColor: isError ? 'red' : colors.indigo[900]}}
            placeholder="Email"
            value={registerForm.email}
            onChangeText={text =>
              setRegisterForm({...registerForm, email: text})
            }
          />
        </View>
        <View className="w-full flex justify-start items-start gap-y-1 mb-4">
          <Text className="text-black font-semibold">Password</Text>
          <TextInput
            keyboardType="visible-password"
            className="w-full border p-2 rounded-md"
            style={{borderColor: isError ? 'red' : colors.indigo[900]}}
            placeholder="Password"
            value={registerForm.password}
            onChangeText={text =>
              setRegisterForm({...registerForm, password: text})
            }
          />
        </View>
        <TouchableOpacity
          disabled={isPending}
          className="w-full flex justify-center items-center p-2 shadow-md rounded-md"
          style={{
            marginTop: 8,
            backgroundColor: colors.indigo[800],
          }}
          onPress={() => registerMutation(registerForm)}>
          {isPending ? (
            <ActivityIndicator
              color={colors.white}
              className="p-1"
              size="small"
              animating={true}
            />
          ) : (
            <Text className="text-lg text-white">Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
