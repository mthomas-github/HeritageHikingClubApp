import React, {memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  Background,
  BackButton,
  Logo,
  Header,
  TextInput,
  Button,
  Toast,
} from '../components';
import {theme} from '../utils/theme';
import {emailValidator} from '../utils/validators';
import {onScreen} from '../constants';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({value: '', type: ''});

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
        setToast({
          type: 'success',
          value: 'Email with password has been sent.',
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            setToast({type: 'error', value: 'Invalid email address format.'});
            break;
          case 'auth/user-not-found':
            setToast({
              type: 'error',
              value: 'User with this email does not exist.',
            });
            break;
          case 'auth/too-many-requests':
            setToast({
              type: 'error',
              value: 'Too many request. Try again in a minute.',
            });
            break;
          default:
            setToast({type: 'error', value: 'Check your internet connection.'});
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
      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({value: '', type: ''})}
      />
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
