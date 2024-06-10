import {NavigatorScreenParams} from '@react-navigation/native';

type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Login: undefined;
  Register: undefined;
  Splash: undefined;
};

type MainTabParamList = {
  JobListings: undefined;
  AppliedJobs: undefined;
  JobDetail: {jobId: string};
  Profile: undefined;
};

type JobDetailScreenNavigationProp = StackNavigationProp<
  MainTabParamList,
  'JobDetail'
>;
type JobDetailScreenRouteProp = RouteProp<MainTabParamList, 'JobDetail'>;

type AppliedJobsScreenNavigationProp = StackNavigationProp<
  MainTabParamList,
  'AppliedJobs'
>;
type AppliedJobsScreenRouteProp = RouteProp<MainTabParamList, 'AppliedJobs'>;
