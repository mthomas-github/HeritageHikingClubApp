import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-fontawesome-pro';
import {theme} from '../utils';
const BackButton = ({goBack, style}) => (
  <TouchableOpacity onPress={goBack} style={style}>
    <Icon
      type="solid"
      size={35}
      name="chevron-double-left"
      style={styles.image}
      color={theme.colors.actionButtons}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: getStatusBarHeight(),
    left: 10,
  },
});

export default memo(BackButton);
