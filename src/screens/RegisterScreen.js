import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {
  Background,
  Header,
  Button,
  TextInput,
  BackButton,
} from '../components';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../utils/validators';
import {goBack} from '../constants';
import {theme} from '../utils';
import {registerEmailAndPassword} from '../api/auth-api';
import {useUpload} from '../hooks';
import {imagePickerOptions} from '../utils';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [{downloadURL, uploading, fileName}, monitorUpload] = useUpload();

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const {didCancel, error} = imagePickerResponse;
      if (didCancel) {
        console.log('Canceled');
      } else if (error) {
        console.log('An error occurred: ', error);
      } else if (fileName) {
        storage()
          .ref('avatars/' + fileName)
          .delete()
          .catch(err => console.log(err))
          .done(() => {
            monitorUpload(imagePickerResponse);
          });
      } else {
        monitorUpload(imagePickerResponse);
      }
    });
  };

  const _onSignUpPressed = async () => {
    if (loading) {
      return;
    }
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
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
            avatarURL: downloadURL,
            avatarFileName: fileName,
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
          {merge: true},
        )
          .catch(err => console.log(err))
          .done();
      })
      .catch(err => Toast.showWithGravity(err, Toast.SHORT, Toast.TOP))
      .done();

    setLoading(false);
  };

  return (
    <Background>
      <BackButton goBack={goBack(navigation)} />
      <Header>Create Account</Header>
      <TouchableOpacity style={styles.avatarPlaceholder} onPress={uploadFile}>
        {downloadURL ? (
          <Image source={{uri: downloadURL}} style={styles.avatar} />
        ) : (
          <Image
            source={require('../assets/tempAvatar.jpg')}
            style={styles.avatar}
          />
        )}
        {uploading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
      <TextInput
        label="Full Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
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

      <Button
        loading={loading}
        mode="contained"
        onPress={_onSignUpPressed}
        style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={goBack(navigation)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E2E6',
    borderRadius: 50,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default memo(RegisterScreen);
