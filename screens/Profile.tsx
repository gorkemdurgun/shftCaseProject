import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native';
import useAppDispatch from '../hooks/useAppDispatch';
import {
  useForm,
  Controller,
  FieldError,
  Merge,
  FieldErrorsImpl,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {userServices} from '../services/user';
import useAppSelector from '../hooks/useAppSelector';
import {setUserInformations} from '../redux/slices/userSlice';
import {useTranslation} from 'react-i18next';
import {TranslatedText} from '../components';
import Snackbar from 'react-native-snackbar';

const ProfileScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {userInformations} = useAppSelector(state => state.user);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  function onSubmit(data: FieldValues) {
    console.log(data);
    updateUserMutation(data as UpdateUserRequest);
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

  const {
    mutate: updateUserMutation,
    isPending: isUpdatePending,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: userServices.updateUser,
    onSuccess: data => {
      Snackbar.show({
        text: t('snackbar.userUpdated'),
        duration: Snackbar.LENGTH_SHORT,
      });
    },
    onError: error => {
      Snackbar.show({
        text: `Error: ${error.message}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  useEffect(() => {
    reset(userInformations as FieldValues);
  }, [userInformations, reset]);

  useEffect(() => {
    getUserMutation();
  }, [getUserMutation]);

  const InputItem = useCallback(
    ({
      readonly,
      name,
      defaultValue,
      rules,
      error,
    }: {
      readonly?: boolean;
      name: string;
      defaultValue?: string;
      rules?: RegisterOptions;
      error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    }) => {
      return (
        <View className="flex flex-col mb-3">
          <TranslatedText
            className="text-sm mb-1"
            text={`screen.profile.labels.${name}`}
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                readOnly={readonly}
                className={`p-2 border border-gray-400 rounded-md ${
                  error ? 'border-red-500' : readonly ? 'opacity-50' : ''
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
    <ScrollView className="flex-1 p-4 pb-0 bg-gray-300">
      <View className="w-full flex flex-col items-start gap-y-2">
        <Text className="text-lg font-bold text-center">
          <TranslatedText text="screen.profile.personalInfo" />
        </Text>
        <View className="w-full flex flex-col gap-y-2">
          <InputItem
            name="name"
            defaultValue={userInformations?.name}
            rules={{required: 'Name is required'}}
            error={errors.name}
          />
          <InputItem
            name="surname"
            defaultValue={userInformations?.surname}
            rules={{required: 'Surname is required'}}
            error={errors.surname}
          />
          <InputItem
            readonly
            name="email"
            defaultValue={userInformations?.email}
            rules={{required: 'Email is required'}}
            error={errors.email}
          />
          <InputItem
            name="profileImage"
            defaultValue={userInformations?.profileImage as string}
            rules={{required: 'Profile image is required'}}
            error={errors.profileImage}
          />
          <InputItem
            name="phone"
            defaultValue={userInformations?.phone}
            rules={{required: 'Phone is required'}}
            error={errors.phone}
          />
          <InputItem
            name="dateOfBirth"
            defaultValue={userInformations?.dateOfBirth}
            rules={{required: 'Date of birth is required'}}
            error={errors.dateOfBirth}
          />
        </View>
      </View>
      <View className="w-full flex flex-col items-start gap-y-2">
        <Text className="text-lg font-bold text-center">
          <TranslatedText text="screen.profile.address" />
        </Text>
        <View className="w-full flex flex-col gap-y-2">
          <InputItem
            name="details"
            defaultValue={userInformations?.address?.details}
          />
          <InputItem
            name="city"
            defaultValue={userInformations?.address?.city}
          />
          <InputItem
            name="country"
            defaultValue={userInformations?.address?.country}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 rounded-lg p-2 mt-4 mb-8">
        {isUpdatePending ? (
          <ActivityIndicator className="py-1" color="white" />
        ) : (
          <Text className="text-lg font-bold text-center text-white">
            <TranslatedText text="screen.profile.save" />
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
