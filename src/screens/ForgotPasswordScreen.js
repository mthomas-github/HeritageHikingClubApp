import React, {memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {
  Background,
  BackButton,
  Logo,
  Header,
  TextInput,
  Button,
} from '../components';
import {theme} from '../utils/theme';
import {emailValidator} from '../utils/validators';
import {onScreen} from '../constants';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const _onSendPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }

    setLoading(true);
    await auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        Toast.showWithGravity('Success! Email with password has been sent.', Toast.LONG, Toast.TOP);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            Toast.showWithGravity('Invalid email address format.', Toast.LONG, Toast.TOP);
            break;
          case 'auth/user-not-found':
            Toast.showWithGravity('User with this email does not exist.', Toast.LONG, Toast.TOP);
            break;
          case 'auth/too-many-requests':
            Toast.showWithGravity('Too many request. Try again in a minute.', Toast.LONG, Toast.TOP);
            break;
          default:
            Toast.showWithGravity('Check your internet connection.', Toast.LONG, Toast.TOP);
            break;
        }
      });

    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={() => onScreen('LoginScreen', navigation)()} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}>
        Send Reset Instructions
      </Button>
      <TouchableOpacity
        style={styles.back}
        onPress={() => onScreen('LoginScreen', navigation)()}>
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
