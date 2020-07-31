import React, {memo, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Background} from '../components';
import {theme} from '../utils/theme';
import {onScreen} from '../constants';

const AuthLoadingScreen = ({navigation}) => {
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        onScreen('Dashboard', navigation)();
      } else {
        // User is not logged in
        onScreen('LoginScreen', navigation)();
      }
    });
  }, [navigation]);

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default memo(AuthLoadingScreen);
