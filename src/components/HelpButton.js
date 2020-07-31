import React, { memo, useState } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-fontawesome-pro';


const HelpButton = ({ onPress, style }) => {
  const [iconColor, setIconColor] = useState('#EAC43D')
  return (
    <Pressable
      onPressIn={() => setIconColor('#A6CD4E')}
      onPressOut={() => setIconColor('#EAC43D')}
      onPress={onPress}
      style={style}>
      <Icon
        type="light"
        size={35}
        name="question-circle"
        color={iconColor}
      />
    </Pressable>
  )
};

export default memo(HelpButton);
