import React, {useEffect} from 'react';
import {
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

const JobListingsScreen = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [jobListMeta, setJobListMeta] = React.useState<JobListMeta>({
    total: 0,
    page: 1,
    perPage: 10,
  });
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const {
    mutate: getAllJobsMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: jobsServices.getJobs,
    onSuccess: ({data, meta}) => {
      setJobs(data);
      setJobListMeta(meta);
      /*
      dispatch(
        setUser({
          user: data.user,
          token: data.accessToken,
        }),
      );
      */
    },
    onError: error => {},
  });

  useEffect(() => {
    getAllJobsMutation({
      page: page,
      perPage: perPage,
    });
  }, [getAllJobsMutation, page, perPage]);

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
      <FlatList
        showsVerticalScrollIndicator={false}
        className="w-full"
        data={jobs}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
          return (
            <View className="flex flex-row flex-wrap items-center justify-center gap-x-2 py-2">
              {Array.from({length: jobListMeta?.total / perPage}, (_, i) => (
                <TouchableOpacity
                  key={i}
                  className={`p-2 rounded-lg ${
                    page === i + 1 ? 'bg-blue-500' : 'bg-white'
                  }`}
                  onPress={() => setPage(i + 1)}>
                  <Text
                    className={`text-sm font-semibold ${
                      page === i + 1 ? 'text-white' : 'text-indigo-500'
                    }`}>
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        renderItem={({item}) => (
          <View className="flex flex-row items-center gap-x-2 p-2 my-[6px] ml-0 bg-white border rounded-lg">
            <Icon name="briefcase" size={20} color={colors.indigo[700]} />
            <View>
              <Text className="text-md font-semibold">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.companyName}</Text>
              <Text className="text-sm text-gray-500">{item.salary}$</Text>
            </View>
            <TouchableOpacity className="flex-1 items-end mb-8">
              <Icon name="check-circle" size={20} color={colors.indigo[700]} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default JobListingsScreen;
