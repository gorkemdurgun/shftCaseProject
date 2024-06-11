import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {clearUser} from '../redux/slices/userSlice';
import {TextInput} from 'react-native';
import useAppDispatch from '../hooks/useAppDispatch';
import {useForm, Controller} from 'react-hook-form';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <View className="flex-1 items-start p-4 pb-0 bg-gray-300">
      <View className="w-full flex flex-col items-start gap-y-2">
        <Text className="text-lg font-bold text-center">
          Personal Informations
        </Text>
        <View className="w-full flex flex-col gap-y-2">
          <View className="flex flex-col">
            <Text className="text-sm mb-1">Name</Text>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  className={`p-2 border border-gray-400 rounded-md ${
                    errors.Name ? 'border-red-500' : ''
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="Name"
              rules={{required: 'Name is required'}}
            />
            {errors.Name && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.Name.message as string}
              </Text>
            )}
          </View>
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
