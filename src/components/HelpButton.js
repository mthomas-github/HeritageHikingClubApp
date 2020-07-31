import React, {memo} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {theme} from '../utils';

const HelpButton = ({onClick, style}) => (
  <Pressable
    style={({pressed}) => [
      {
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
      },
      style,
    ]}>
    <Icon
      type="light"
      size={35}
      name="question-circle"
      color={theme.colors.actionButtons}
    />
  </Pressable>
);

export default memo(HelpButton);
