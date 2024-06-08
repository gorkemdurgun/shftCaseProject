import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import colors from 'tailwindcss/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';

const JobListingsScreen = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');

  return (
    <View className="flex-1 justify-start items-center p-4 bg-gray-300">
      <View
        className="w-full flex flex-row items-center px-2 py-3 rounded-lg overflow-hidden"
        style={{backgroundColor: colors.indigo[100]}}>
        <Icon name="magnifying-glass" size={20} color={colors.indigo[700]} />
        <TextInput
          className="ml-2"
          placeholder="Search for jobs..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
    </View>
  );
};

export default JobListingsScreen;
