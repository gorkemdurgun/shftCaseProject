import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import colors from 'tailwindcss/colors';

const routes: {
  route: string;
  title: string;
  icon: string;
}[] = [
  {
    route: 'JobListings',
    title: 'Job Listings',
    icon: 'list',
  },
  {
    route: 'AppliedJobs',
    title: 'Applied Jobs',
    icon: 'list-check',
  },
  {
    route: 'Profile',
    title: 'Profile',
    icon: 'user',
  },
];

function BottomTabBar({state, descriptors, navigation}: any) {
  const visibleRoutes = state.routes.filter(
    (route: any) => route.name !== 'JobDetail',
  );
  return (
    <View
      className="flex flex-row justify-between items-center p-4"
      style={{backgroundColor: colors.indigo[700]}}>
      {visibleRoutes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center gap-y-1">
            <Icon
              name={routes[index]?.icon}
              size={20}
              color={isFocused ? colors.white : colors.indigo[300]}
            />
            <Text
              style={{
                color: isFocused ? colors.white : colors.indigo[300],
              }}>
              {routes[index]?.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabBar;
