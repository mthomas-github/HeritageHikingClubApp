import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../utils/theme';

const Paragraph = ({children, textAlign}) => (
  <Text style={[styles.text, textAlign]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default memo(Paragraph);
