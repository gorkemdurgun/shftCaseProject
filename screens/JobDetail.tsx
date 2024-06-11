import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {jobsServices} from '../services/jobs';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import {
  JobDetailScreenNavigationProp,
  JobDetailScreenRouteProp,
} from '../types/navigation';
import Snackbar from 'react-native-snackbar';
import useAppSelector from '../hooks/useAppSelector';

const JobDetailScreen = ({
  route,
  navigation,
}: {
  route: JobDetailScreenRouteProp;
  navigation: JobDetailScreenNavigationProp;
}) => {
  const userAppliedJobs = useAppSelector(state => state.user.user?.appliedJobs);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const {
    mutate: getAllJobsMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: jobsServices.getJobsById,
    onSuccess: job => {
      setSelectedJob(job);
    },
    onError: error => {
      console.log(error);
    },
  });

  const {
    mutate: applyJobMutation,
    isPending: isApplyJobPending,
    isError: isApplyJobError,
  } = useMutation({
    mutationFn: jobsServices.applyJob,
    onSuccess: () => {
      Snackbar.show({
        text: 'Applied successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    if (route.params.jobId) {
      getAllJobsMutation({
        id: route.params.jobId,
      });
    }
  }, [getAllJobsMutation, route.params.jobId]);

  if (!selectedJob) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">No job found</Text>
      </View>
    );
  }

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 pt-4 bg-gray-300">
      <View className="flex flex-col items-center gap-y-4 m-4 p-4 bg-indigo-100 rounded-2xl">
        <FaIcon name="briefcase" size={32} color="blue" />
        <Text className="text-xl font-bold">{selectedJob?.name}</Text>
        <Text className="font-bold text-md">
          Company:{' '}
          <Text className="font-bold font-normal">
            {selectedJob?.companyName}
          </Text>
        </Text>
        <Text className="font-bold text-md">
          Location: <Text className="font-normal">{selectedJob?.location}</Text>
        </Text>
        <Text className="font-bold text-md">
          Salary: <Text className="font-normal">{selectedJob?.salary}</Text>
        </Text>
        <View className="flex flex-col items-center gap-y-2">
          <Text className="font-bold text-md"> Keywords: </Text>
          <View className="flex flex-row flex-wrap gap-2">
            {selectedJob?.keywords.map(keyword => (
              <View key={keyword} className="border p-1 rounded-md">
                <Text className="text-md">{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="flex flex-col items-center gap-y-2">
          <Text className="font-bold text-md"> Description: </Text>
          <View className="border p-1 rounded-md bg-white">
            <Text className="text-md">{selectedJob?.description}</Text>
          </View>
        </View>
        {userAppliedJobs?.includes(selectedJob?.id) ? (
          <TouchableOpacity
            className="py-2 px-8 bg-red-500 rounded-lg"
            // onPress={() => applyJobMutation({id: selectedJob?.id})}
          >
            <Text className="text-white">Withdraw</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="py-2 px-8 bg-blue-500 rounded-lg"
            onPress={() => applyJobMutation({id: selectedJob?.id})}>
            <Text className="text-white">Apply</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default JobDetailScreen;
