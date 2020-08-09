import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Pressable,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore'
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
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../utils/validators';
import { goBack } from '../constants';
import { registerEmailAndPassword } from '../api/auth-api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const _onSignUpPressed = async () => {
    if (loading) {
      return;
    }
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      Toast.showWithGravity(nameError, Toast.TOP, Toast.LONG)
      Toast.showWithGravity(emailError, Toast.TOP, Toast.LONG)
      Toast.showWithGravity(passwordError, Toast.TOP, Toast.LONG)
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    registerEmailAndPassword(email.value, password.value)
      .then(resp => {
        let db = firestore()
          .collection('Users')
          .doc(resp.user.uid);

        db.set(
          {
            name: name.value,
            email: email.value,
            avatarURL: null,
            avatarFileName: null,
            userLocation: null,
            isHHC: false,
            isMod: false,
            isAdmin: false,
            isSuper: false,
            memberStatsHHC: [],
            memberStats: [],
            fbGroups: [],
            trips: [],
          },
          { merge: true },
        )
          .catch(err => console.log(err))
          .done();
      })
      .catch(err => console.log(err))
      .done();

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
              Create User
          </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              onChangeText={text => setName({ value: text, error: '' })}
              value={name.value}
              placeholder="Full Name"
              autoCapitalize='none'
              placeholderTextColor={AppTextColor}
            />
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
              <Pressable style={styles.buttonText} onPress={_onSignUpPressed}><Text>Create Account</Text></Pressable>
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

export default memo(RegisterScreen);
