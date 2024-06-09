import React from 'react';
import {Button, Text, View} from 'react-native';

const JobDetailScreen = ({route, navigation}: any) => {
  console.log(route.params);

  return (
    <View className="flex-1 justify-start items-center pt-4 bg-gray-300">
      <Text className="text-2xl font-bold text-center text-blue-500">
        JobDetailScreen {route.params.jobId}
      </Text>
    </View>
  );
};

export default JobDetailScreen;
