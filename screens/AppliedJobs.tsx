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

const AppliedJobsScreen = ({navigation}: any) => {
  const appliedJobs = useAppSelector(state => state.user.user?.appliedJobs);

  const [totalListLength, setTotalListLength] = React.useState<number>(0);
  const [userAppliedJobs, setUserAppliedJobs] = React.useState<Job[]>([]);

  console.log('appliedJobs', appliedJobs);

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
    onError: error => {},
  });

  useEffect(() => {
    getAllJobsMutation({
      perPage: totalListLength,
    });
  }, [getAllJobsMutation, totalListLength]);

  return (
    <View className="flex-1 items-center pt-4 px-2 pb-0 bg-gray-300">
      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.indigo[500]} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          className="w-full"
          data={userAppliedJobs}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              className="flex flex-row items-center p-4 my-[6px] ml-0 bg-white rounded-lg"
              // onPress={() => navigation.navigate('JobDetail', {job: item})}
            >
              <Icon name="briefcase" size={28} color={colors.gray[700]} />
              <View className="ml-4">
                <Text className="text-md font-semibold">{item.name}</Text>
                <Text className="text-sm text-indigo-400">
                  Company:{' '}
                  <Text className="text-black">{item.companyName}</Text>
                </Text>
                <Text className="text-sm text-indigo-400">
                  Salary: <Text className="text-black">{item.salary}$</Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AppliedJobsScreen;
