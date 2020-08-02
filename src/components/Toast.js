import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {theme} from '../utils/theme';

const Toast = ({type = 'error', message, onDismiss}) => (
  <View style={styles.container}>
   
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80 + getStatusBarHeight(),
    width: '100%',
  },
  content: {
    fontWeight: '500',
  },
});

export default memo(Toast);
