import React, {memo, useEffect, useState} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NumericInput from '@easyitconsulting/react-native-numeric-inputs';
import {Picker} from '@react-native-community/picker';
import {
  ActionSheetIOS,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  Background,
  Paragraph,
  Header,
  BackButton,
  Logo,
  Button,
} from '../components';
import {goBack, onScreen} from '../constants';

const AdventureInterestedScreen = ({navigation, route}) => {
  const [partySize, setPartySize] = useState(1);
  const [hikingLevel, setHikingLevel] = useState(
    Platform.OS === 'ios' ? '-----Choose Hiking Level-----' : '0',
  );
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const hikingLevels = ['Poor', 'Fair', 'Good', 'Excellent'];

  useEffect(() => {
    setLoading(true);
    let userid = '';
    try {
      userid = auth().currentUser.uid;
    } catch (ex) {
      console.log(ex);
    }
    setUserId(userid);
    setLoading(false);
  }, []);

  const onSelectCategory = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {options: hikingLevels},
      buttonIndex => setHikingLevel(hikingLevels[buttonIndex]),
    );
  };

  const onSubmit = () => {
    const db = firestore()
      .collection('Trips')
      .doc(route.params.key);

    db.update({
      members: firebase.firestore.FieldValue.arrayUnion({
        hikingLevel: hikingLevel,
        partySize: partySize,
        userID: userId,
      }),
    })
      .then(() => onScreen('Dashboard', navigation)())
      .catch(err => console.log(err));
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <Background>
      <BackButton goBack={goBack(navigation)} />
      <Header>{route.params.Name}</Header>
      <Logo />
      <Paragraph>Party Size (Including Your Self)</Paragraph>
      <NumericInput
        type="up-down"
        maxValue={10}
        minValue={1}
        value={partySize}
        onChange={value => setPartySize(value)}
        onLimitReached={(isMax, msg) => Toast.showWithGravity(msg, Toast.SHORT, Toast.TOP)}
        onLimitReachedMessage="Max Party Size! Contact HHC"
      />
      <View style={styles.container}>
        <Paragraph style={styles.container}>Hiking Level</Paragraph>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={onSelectCategory}>
            <Text style={styles.textborder}>{hikingLevel}</Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={hikingLevel}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) => setHikingLevel(itemValue)}>
            <Picker.Item label="Poor" value="Poor" />
            <Picker.Item label="Fair" value="Fair" />
            <Picker.Item label="Good" value="Good" />
            <Picker.Item label="Excellent" value="Excellent" />
          </Picker>
        )}
      </View>
      <Button onPress={onSubmit}>Submit</Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  textborder: {
    borderRadius: 5,
    // Set border width.
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: 'transparent',
    // Setting up Text Font Color.
    color: '#000',
    // Setting Up Background Color of Text component.
    backgroundColor: 'transparent',
    // Adding padding on Text component.
    padding: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  pickerStyle: {
    height: 50,
    width: 150,
  },
});

export default memo(AdventureInterestedScreen);
