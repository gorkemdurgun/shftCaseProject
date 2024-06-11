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
import RNPickerSelect from 'react-native-picker-select';
import Snackbar from 'react-native-snackbar';

const JobListingsScreen = ({navigation}: {navigation: any}) => {
  const orderRef = React.useRef<RNPickerSelect>(null);
  const orderDirectionRef = React.useRef<RNPickerSelect>(null);

  const appliedJobs = useAppSelector(state => state.user.user?.appliedJobs);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchField, setSearchField] = React.useState<SearchField | null>(
    null,
  );
  const [orderByField, setOrderByField] = React.useState<
    OrderByField | undefined
  >(undefined);
  const [orderByDirection, setOrderByDirection] = React.useState<
    OrderByDirection | undefined
  >(undefined);
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
      console.log(
        'job salaries',
        data.map(job => job.salary),
      );
      setJobs(data);
      setJobListMeta(meta);
    },
    onError: error => {
      Snackbar.show({
        text: 'Failed to fetch jobs',
        duration: 1000,
      });
    },
  });

  useEffect(() => {
    if (searchQuery && searchField === null) {
      Snackbar.show({
        text: 'Please select a search field',
        duration: 1000,
      });
    } else if (searchField && !searchQuery) {
      Snackbar.show({
        text: 'Please enter a search query',
        duration: 1000,
      });
    }
  }, [searchField, searchQuery]);

  useEffect(() => {
    if (searchField && searchQuery) {
      getAllJobsMutation({
        page: jobListMeta.page,
        perPage: jobListMeta.perPage,
        searchField,
        searchQuery,
        orderByField,
        orderByDirection,
      });
    } else {
      getAllJobsMutation({
        page: jobListMeta.page,
        perPage: jobListMeta.perPage,
        orderByField,
        orderByDirection,
      });
    }
  }, [
    getAllJobsMutation,
    jobListMeta.page,
    jobListMeta.perPage,
    searchField,
    searchQuery,
    orderByField,
    orderByDirection,
  ]);

  return (
    <View className="flex-1 items-center pt-4 px-2 pb-0 bg-gray-300">
      <View
        className="w-full flex flex-row items-center px-2 py-3 rounded-lg overflow-hidden"
        style={{backgroundColor: colors.indigo[100]}}>
        <Icon name="magnifying-glass" size={20} color={colors.indigo[700]} />
        <TextInput
          keyboardType={searchField === 'salary' ? 'numeric' : 'default'}
          className="w-full ml-2"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View className="flex flex-row ml-auto mr-2">
          <RNPickerSelect
            placeholder={{label: 'Search by...', value: null}}
            value={searchField}
            onValueChange={setSearchField}
            style={{
              placeholder: {
                color: colors.indigo[700],
              },
              inputIOSContainer: {
                backgroundColor: colors.indigo[200],
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 8,
              },
            }}
            items={[
              {label: 'Name', value: 'name'},
              {label: 'Company Name', value: 'companyName'},
              {label: 'Location', value: 'location'},
              {label: 'Salary', value: 'salary'},
            ]}
          />
        </View>
      </View>
      <View className="w-full flex flex-row items-center mt-2">
        <TouchableOpacity
          style={{backgroundColor: colors.indigo[100]}}
          className="flex-1 flex-row items-center mr-1 p-2 bg-indigo-100 rounded-lg "
          onPress={() => orderRef?.current?.togglePicker(true)}>
          <Icon
            name="sort"
            style={{marginRight: 8}}
            size={16}
            color={colors.indigo[700]}
          />
          <RNPickerSelect
            ref={orderRef}
            value={orderByField}
            placeholder={{label: 'Ordered by...', value: null}}
            onValueChange={setOrderByField}
            style={{
              placeholder: {
                color: colors.indigo[700],
              },
              inputIOSContainer: {
                marginTop: 2,
              },
            }}
            items={[
              {label: 'Created At', value: 'createdAt'},
              {label: 'Salary', value: 'salary'},
            ]}
          />
        </TouchableOpacity>
        <View
          style={{backgroundColor: colors.indigo[100]}}
          className="flex-1 flex-row items-center ml-1 p-2 rounded-lg ">
          <Icon
            name="sort"
            style={{marginRight: 8}}
            size={16}
            color={colors.indigo[700]}
          />
          <RNPickerSelect
            ref={orderDirectionRef}
            value={orderByDirection}
            placeholder={{label: 'Sorted by...', value: null}}
            onValueChange={setOrderByDirection}
            style={{
              placeholder: {
                color: colors.indigo[700],
              },
              inputIOSContainer: {
                marginTop: 2,
              },
            }}
            items={[
              {label: 'Ascending', value: 'asc'},
              {label: 'Descending', value: 'desc'},
            ]}
          />
        </View>
      </View>

      {(isError || isPending || jobs.length === 0) && (
        <View className="flex-1 items-center justify-center">
          {isError && (
            <>
              <Text className="text-lg text-red-500">Failed to fetch jobs</Text>
              <TouchableOpacity onPress={() => getAllJobsMutation({})}>
                <Text className="text-lg text-blue-500">Retry</Text>
              </TouchableOpacity>
            </>
          )}
          {isPending && (
            <ActivityIndicator size="large" color={colors.indigo[500]} />
          )}
          {jobs.length === 0 && !isPending && !isError && (
            <Text className="text-lg text-gray-500">No jobs found</Text>
          )}
        </View>
      )}

      {!isPending && jobs.length > 0 && (
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
