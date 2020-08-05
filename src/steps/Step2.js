import React, {useEffect, useState, memo} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Pressable
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppSignupProcessTimer
} from '../AppSettings';
import { HelpButton, TextInput } from '../components';
const {width} = Dimensions.get('window');

const Step2 = ({...props}) => {
  const [loading, setLoading] = useState(false);
  const {back, next, cancel, saveState} = props;
  const [partySize, setPartySize] = useState();
  const [tripID, setTripID] = useState();
  const tripData = props.getTrip();

  useEffect(() => {
    setLoading(true);
    setTripID(tripData.key);
    tripData.members.map(member => {
      if (member.userID === auth().currentUser.uid) {
        setPartySize(member.partySize.toString());
        saveState({
          UserId: member.userID,
          OnTrip: true,
          TripID: tripID,
        });
      }
    });
    setLoading(false);
  }, [saveState, tripData, tripData.members, tripID]);

  const handleChange = value => {
    value < 0 ? setPartySize('0') : setPartySize(value.toString());
    value > 10 ? setPartySize('10') : setPartySize(value.toString());
  };

  const onNext = () => {
    saveState({partySize: Number(1)});
    next();
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Text style={styles.headerStyle}>
              Confirm Party Size
          </Text>
          </View>
          <View style={styles.instructionView}>
            <TextInput
              label="Party Size"
              returnKeyType="done"
              value={partySize}
              onChangeText={text =>
                handleChange(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))
              }
              keyboardType="numeric"
              maxLength={2}
            />
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonText} onPressIn={back}><Text>Back</Text></Pressable>
              <Pressable style={styles.buttonText} onPressIn={cancel}><Text>Cancel</Text></Pressable>
              <Pressable style={styles.buttonText} onPressIn={onNext}><Text>Next</Text></Pressable>
            </View>
          </View>
        </View>
      </View>
   
  );
};

const styles = StyleSheet.create({
  paddingTop5: {
    paddingTop: 5,
  },
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
  headerStyle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '300',
    marginBottom: 24,
    color: AppHeaderTextColor,
  },
  elementsContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  buttonText: {
    backgroundColor: AppActionButtonColor,
    color: AppTextColor,
    width: 100,
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 50,
    marginLeft: 12,
  },
  instructionText: {
    color: AppTextColor,
    textAlign: 'justify',
    fontSize: 16,
  },
  instructionView: {
    flex: 1,
    flexWrap: 'nowrap',
  },
});

export default memo(Step2);
