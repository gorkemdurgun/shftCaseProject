import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useMutation} from '@tanstack/react-query';
import {jobsServices} from '../services/jobs';

import {RootState} from '../redux/store';
import useAppSelector from '../hooks/useAppSelector';
import Snackbar from 'react-native-snackbar';
import JobCard from '../components/JobCard';

const AppliedJobsScreen = ({navigation}: {navigation: any}) => {
  const appliedJobs = useAppSelector(state => state.user.user?.appliedJobs);

  const [totalListLength, setTotalListLength] = React.useState<number>(0);
  const [userAppliedJobs, setUserAppliedJobs] = React.useState<Job[]>([]);

  const {
    mutate: getAllJobsMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: jobsServices.getJobs,
    onSuccess: ({data, meta}) => {
      setTotalListLength(meta.total);
      data = data.filter(job => appliedJobs?.includes(job.id));
      setUserAppliedJobs(data);
    },
    onError: error => {
      console.log('applied jobs error', error);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  useEffect(() => {
    getAllJobsMutation({
      perPage: totalListLength,
    });
  }, [getAllJobsMutation, totalListLength]);

  return (
    <View className="flex-1 items-center pt-4 px-2 pb-0 bg-gray-300">
      {(isError || isPending || userAppliedJobs.length === 0) && (
        <View className="flex-1 items-center justify-center">
          {isPending && (
            <ActivityIndicator size="large" color={colors.indigo[500]} />
          )}
          {isError && <Text>Error fetching applied jobs</Text>}
          {userAppliedJobs.length === 0 && !isPending && !isError && (
            <Text className="text-lg text-gray-500">
              You have not applied to any jobs yet
            </Text>
          )}
        </View>
      )}

      {userAppliedJobs.length > 0 && (
        <FlatList
          className="w-full"
          showsVerticalScrollIndicator={false}
          data={userAppliedJobs}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <JobCard
              key={index}
              job={item}
              onPress={() => {
                navigation.navigate('Main', {
                  screen: 'JobDetail',
                  params: {jobId: item.id},
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default AppliedJobsScreen;
