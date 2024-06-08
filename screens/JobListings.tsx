import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import colors from 'tailwindcss/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useMutation} from '@tanstack/react-query';
import {jobsServices} from '../services/jobs';

const JobListingsScreen = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');

  const {
    mutate: getAllJobsMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: jobsServices.getJobs,
    onSuccess: data => {
      // console.log('data', data);
      /*
      dispatch(
        setUser({
          user: data.user,
          token: data.accessToken,
        }),
      );
      */
    },
    onError: error => {
      console.log('errorred', error);
    },
  });

  React.useEffect(() => {
    getAllJobsMutation();
  }, []);

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
