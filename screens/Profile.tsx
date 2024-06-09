import React from 'react';
import {Text, View} from 'react-native';
import {clearUser} from '../redux/slices/userSlice';
import {TouchableOpacity} from 'react-native';
import useAppDispatch from '../hooks/useAppDispatch';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(clearUser());
  }

  return (
    <View className="flex-1 justify-start items-center pt-4 bg-gray-300">
      <Text className="text-2xl font-bold text-center text-blue-500">
        ProfileScreen
      </Text>
      <TouchableOpacity
        className="px-4 py-2 mt-4 bg-red-500 rounded-lg"
        onPress={handleLogout}>
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
