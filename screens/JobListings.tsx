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
import {useTranslation} from 'react-i18next';

const JobListingsScreen = ({navigation}: {navigation: any}) => {
  const {t} = useTranslation();
  const orderRef = React.useRef<RNPickerSelect>(null);
  const orderDirectionRef = React.useRef<RNPickerSelect>(null);

  const appliedJobs = useAppSelector(
    state => state.user.loggedUser?.appliedJobs,
  );

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchField, setSearchField] = React.useState<SearchField | undefined>(
    undefined,
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
      setJobs(data);
      setJobListMeta(meta);
    },
    onError: error => {
      Snackbar.show({
        text: error.message,
        duration: 1000,
      });
    },
  });

  function getJobs() {
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
  }

  useEffect(() => {
    if (searchQuery && !searchField) {
      setSearchField('name');
    }
  }, [searchField, searchQuery]);

  useEffect(() => {
    if (!orderByField && orderByDirection) {
      setOrderByField('createdAt');
    } else if (orderByField && !orderByDirection) {
      setOrderByDirection('asc');
    }
  }, [orderByField, orderByDirection]);

  useEffect(() => {
    getJobs();
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
    <View className="flex-1 items-center p-4 pb-0 bg-gray-300">
      <View
        className="w-full flex flex-row items-center px-2 py-3 rounded-lg overflow-hidden"
        style={{backgroundColor: colors.indigo[100]}}>
        <Icon name="magnifying-glass" size={20} color={colors.indigo[700]} />
        <TextInput
          keyboardType={searchField === 'salary' ? 'numeric' : 'default'}
          className="w-full ml-2"
          placeholder={t('input.searchInput.placeholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View className="flex flex-row ml-auto mr-2">
          <RNPickerSelect
            placeholder={{
              label: t('input.searchByPicker.placeholder'),
              value: undefined,
            }}
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
              {
                label: t('input.searchByPicker.name'),
                value: 'name',
              },
              {
                label: t('input.searchByPicker.companyName'),
                value: 'companyName',
              },
              {label: t('input.searchByPicker.location'), value: 'location'},
              {label: t('input.searchByPicker.salary'), value: 'salary'},
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
            placeholder={{
              label: t('input.orderByPicker.placeholder'),
              value: undefined,
            }}
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
              {label: t('input.orderByPicker.createdAt'), value: 'createdAt'},
              {label: t('input.orderByPicker.salary'), value: 'salary'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: colors.indigo[100]}}
          className="flex-1 flex-row items-center ml-1 p-2 rounded-lg "
          onPress={() => orderDirectionRef?.current?.togglePicker(true)}>
          <Icon
            name="sort"
            style={{marginRight: 8}}
            size={16}
            color={colors.indigo[700]}
          />
          <RNPickerSelect
            ref={orderDirectionRef}
            value={orderByDirection}
            placeholder={{
              label: t('input.sortByPicker.placeholder'),
              value: undefined,
            }}
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
              {label: t('input.sortByPicker.asc'), value: 'asc'},
              {label: t('input.sortByPicker.desc'), value: 'desc'},
            ]}
          />
        </TouchableOpacity>
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
          refreshControl={
            <RefreshControl refreshing={isPending} onRefresh={getJobs} />
          }
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
