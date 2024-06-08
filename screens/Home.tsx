import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearUser} from '../redux/slices/userSlice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-center text-blue-500">
        HomeScreen
      </Text>
      <Button
        // className="bg-red-500 text-red-500 p-2 rounded"
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default HomeScreen;
