import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
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
import JobCard from '../components/JobCard';

const JobListingsScreen = ({navigation}: {navigation: any}) => {
  const appliedJobs = useAppSelector(state => state.user.user?.appliedJobs);

  const [search, setSearch] = React.useState('');
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [jobListMeta, setJobListMeta] = React.useState<JobListMeta>({
    total: 0,
    page: 1,
    perPage: 10,
  });

  const {
    mutate: getAllJobsMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: jobsServices.getJobs,
    onSuccess: ({data, meta}) => {
      setJobs(data);
      setJobListMeta(meta);
    },
    onError: error => {
      console.log('job listings error', error);
    },
  });

  useEffect(() => {
    getAllJobsMutation({
      page: jobListMeta.page,
      perPage: jobListMeta.perPage,
    });
  }, [getAllJobsMutation, jobListMeta]);

  return (
    <View className="flex-1 items-center pt-4 px-2 pb-0 bg-gray-300">
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
      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.indigo[500]} />
        </View>
      ) : (
        <FlatList
          className="w-full"
          showsVerticalScrollIndicator={false}
          data={jobs}
          keyExtractor={item => item.id}
          ListFooterComponent={() => {
            return (
              <View className="flex flex-row flex-wrap items-center justify-center gap-x-2 py-2">
                {Array.from(
                  {length: jobListMeta?.total / jobListMeta.perPage},
                  (_, i) => (
                    <TouchableOpacity
                      key={i}
                      className={`p-2 rounded-lg ${
                        jobListMeta.page === i + 1 ? 'bg-blue-500' : 'bg-white'
                      }`}
                      onPress={() =>
                        setJobListMeta({...jobListMeta, page: i + 1})
                      }>
                      <Text
                        className={`text-sm font-semibold ${
                          jobListMeta.page === i + 1
                            ? 'text-white'
                            : 'text-indigo-500'
                        }`}>
                        {i + 1}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            );
          }}
          renderItem={({item, index}) => (
            <JobCard
              key={index}
              job={item}
              isApplied={appliedJobs?.includes(item.id)}
              onPress={() => navigation.navigate('JobDetail', {jobId: item.id})}
            />
          )}
        />
      )}
    </View>
  );
};

export default JobListingsScreen;
