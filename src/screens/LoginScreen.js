import React, {memo, useState} from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {
  TextInput,
  HelpButton,
  Logo,
} from '../components';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../AppSettings';
import {emailValidator, passwordValidator} from '../utils/validators';
import {onScreen} from '../constants';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const _onLoginPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      Toast.showWithGravity(emailError, Toast.TOP, Toast.LONG);
      Toast.showWithGravity(passwordError, Toast.TOP, Toast.LONG);
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
            Toast.showWithGravity('Invalid email address format.', Toast.LONG, Toast.TOP);
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            Toast.showWithGravity('Invalid email address or password.', Toast.LONG, Toast.TOP);
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
  return loading ?
    <ActivityIndicator size='large' />
    : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Logo />
            <Text style={styles.headerStyle}>
              Welcome Back
          </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              onChangeText={text => setEmail({ value: text, error: '' })}
              value={email.value}
              placeholder="Email"
              keyboardType='email-address'
              autoCapitalize='none'
              placeholderTextColor={AppTextColor}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              onChangeText={text => setPassword({ value: text, error: '' })}
              value={password.value}
              placeholder="Password"
              autoCapitalize='none'
              placeholderTextColor={AppTextColor}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => onScreen('ForgotPasswordScreen', navigation)()}><Text>Forgot your password? Click Here</Text></Pressable>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonText} onPress={_onLoginPressed}><Text>Login</Text></Pressable>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => onScreen('RegisterScreen', navigation)()}><Text>Don’t have an account? Sign Up</Text></Pressable>
            </View>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flex: 1,
    backgroundColor: AppBackGroundColor,
  },
  headerView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  helpButton: {
    marginLeft: 'auto',
    paddingRight: 10,
  },
  backButton: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  headerStyle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '300',
    marginBottom: 24,
    color: AppHeaderTextColor,
  },
  elementsContainer: {
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  inputView: {
    marginBottom: 15,
    alignContent: 'center'
  },
  inputViewImage: {
    marginBottom: 15,
    alignItems: 'center'
  },
  inputText: {
    height: 40,
    borderColor: AppHeaderTextColor,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    backgroundColor: AppActionButtonColor,
    color: AppTextColor,
    padding: 15,
    alignItems: 'center',
    borderRadius: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default memo(LoginScreen);
