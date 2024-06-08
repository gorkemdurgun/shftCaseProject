import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const SplashScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigation.navigate('Main', {screen: 'JobListings'});
      } else {
        navigation.navigate('Login');
      }
    }, 1000); // 1 saniye bekleme süresi, gerçek bir uygulamada bu süre API çağrıları vb. için daha uzun olabilir
  }, [token, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACME Job Finder</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
