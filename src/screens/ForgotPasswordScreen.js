import React, { memo, useState } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View,
  TextInput
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import {
  HelpButton,
  BackButton,
  Logo,
} from '../components';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../AppSettings';
import { emailValidator } from '../utils/validators';
import { onScreen, goBack } from '../constants';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const _onSendPressed = async () => {
    if (loading) {
      return;
    }

    const emailError = emailValidator(email.value);

    if (emailError) {
      Toast.showWithGravity(emailError, Toast.TOP, Toast.LONG);
      setEmail({ ...email, error: emailError });
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

  return loading ?
    <ActivityIndicator size='large' />
    : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <BackButton style={styles.backButton} goBack={goBack(navigation)} />
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Logo />
            <Text style={styles.headerStyle}>
              Forgot Password
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
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonText} onPress={_onSendPressed}><Text>Send Reset Instructions</Text></Pressable>
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
    paddingTop: 10,
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

export default memo(ForgotPasswordScreen);
