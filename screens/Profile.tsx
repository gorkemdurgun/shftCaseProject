import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  useForm,
  Controller,
  FieldError,
  Merge,
  FieldErrorsImpl,
  RegisterOptions,
} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {userServices} from '../services/user';
import useAppSelector from '../hooks/useAppSelector';
import {setUserInformations} from '../redux/slices/userSlice';
import {useTranslation} from 'react-i18next';
import {TranslatedText} from '../components';

const ProfileScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {userInformations} = useAppSelector(state => state.user);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  const {
    mutate: getUserMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: userServices.getUser,
    onSuccess: data => {
      dispatch(setUserInformations(data));
    },
    onError: error => {
      console.log('user error', error);
    },
  });

  useEffect(() => {
    getUserMutation();
  }, [getUserMutation]);

  const InputItem = useCallback(
    ({
      label,
      name,
      defaultValue,
      rules,
      error,
    }: {
      label: string;
      name: string;
      defaultValue?: string;
      rules?: RegisterOptions;
      error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    }) => {
      return (
        <View className="flex flex-col mb-3">
          <Text className="text-sm mb-1">{label}</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className={`p-2 border border-gray-400 rounded-md ${
                  error ? 'border-red-500' : ''
                }`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue={defaultValue}
              />
            )}
            name={name}
            rules={rules}
          />
          {error && (
            <Text className="text-red-500 text-sm mt-1">
              {error.message as string}
            </Text>
          )}
        </View>
      );
    },
    [control],
  );

  return (
    <View className="flex-1 items-start p-4 pb-0 bg-gray-300">
      <View className="w-full flex flex-col items-start gap-y-2">
        <Text className="text-lg font-bold text-center">
          <TranslatedText text="screen.profile.title" />
        </Text>
        <View className="w-full flex flex-col gap-y-2">
          <InputItem
            label="Name"
            name="name"
            defaultValue={userInformations?.name}
            rules={{required: 'Name is required'}}
            error={errors.name}
          />
          <InputItem
            label="Surname"
            name="surname"
            defaultValue={userInformations?.surname}
            rules={{required: 'Surname is required'}}
            error={errors.surname}
          />
          <InputItem
            label="Email"
            name="email"
            defaultValue={userInformations?.email}
            rules={{required: 'Email is required'}}
            error={errors.email}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 p-2 mt-4">
        <Text className="text-lg font-bold text-center text-white">Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
