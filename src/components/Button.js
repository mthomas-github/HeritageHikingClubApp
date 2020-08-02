import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {theme} from '../utils/theme';

const Button = ({mode, style, children, ...props}) => (
  <Pressable
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: theme.colors.actionButtons},
      style,
    ]}
    labelStyle={[
      styles.text,
      mode === 'contained' && {color: theme.colors.actionButtons},
      style,
    ]}
    mode={mode}
    {...props}>
    <Text>
      {children}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
