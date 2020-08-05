import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor
} from '../AppSettings';
export const PartyInfoRow = ({ ...props }) => {
  const {
    member,
    inputName,
    inputEmail,
    onChangeName,
    onChangeEmail,
    blurName,
    blurEmail,
  } = props;
  return (
    <View stlye={styles.container}>
      <Text style={styles.label}>{member === 1 ? 'Main Member' : 'Member' + member}</Text>
      <TextInput
        key={props.key}
        style={[styles.commonInput, styles.inputName]}
        onChangeText={onChangeName}
        value={inputName}
        onBlur={blurName}
        placeholder='Full Name'
        placeholderTextColor={'#2A5C99'}
      />
      <TextInput
        key={props.key}
        style={[styles.commonInput]}
        onChangeText={onChangeEmail}
        value={inputEmail}
        onBlur={blurEmail}
        placeholder='Email'
        placeholderTextColor={'#2A5C99'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    paddingBottom: 10, paddingTop: 10
  },
  commonInput: {
    height: 40,
    borderWidth: 1,
    borderColor: AppHeaderTextColor
  }, 
  inputName: {
    marginBottom: 10
  },
});
