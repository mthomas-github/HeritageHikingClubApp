import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  Toast,
} from '../components';
import {theme} from '../utils/theme';
import {emailValidator, passwordValidator} from '../utils/validators';
import {onScreen} from '../constants';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const _onLoginPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
            setError('Invalid email address format.');
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('Invalid email address or password.');
            break;
          case 'auth/too-many-requests':
            setError('Too many request. Try again in a minute.');
            break;
          default:
            setError('Check your internet connection.');
            break;
        }
      });

    setLoading(false);
  };

  return (
    <Background>
      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => onScreen('ForgotPasswordScreen', navigation)()}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => onScreen('RegisterScreen', navigation)()}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
