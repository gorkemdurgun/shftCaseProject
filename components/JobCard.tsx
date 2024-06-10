import {Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import colors from 'tailwindcss/colors';

const JobCard = ({
  job,
  isApplied,
  onPress,
}: {
  job: Job;
  isApplied?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className="flex flex-row items-center p-4 my-[6px] ml-0 bg-white rounded-lg"
      onPress={onPress}>
      <Icon name="briefcase" size={28} color={colors.gray[700]} />
      <View className="ml-4">
        <Text className="text-md font-semibold">{job.name}</Text>
        <Text className="text-sm text-indigo-400">
          Company: <Text className="text-black">{job.companyName}</Text>
        </Text>
        <Text className="text-sm text-indigo-400">
          Salary: <Text className="text-black">{job.salary}$</Text>
        </Text>
      </View>
      {isApplied ? (
        <View className="flex-1 flex items-end mb-8">
          <Icon name="check-circle" size={20} color={colors.green[500]} />
        </View>
      ) : (
        <Text>a</Text>
      )}
    </TouchableOpacity>
  );
};

export default JobCard;
