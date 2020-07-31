import React, {useEffect, useState, memo} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Step2Container} from '../styles';
import {Logo, Header, TextInput, Paragraph} from '../components';
import Timer from '../components/Timer';
const {width} = Dimensions.get('window');

const ConfirmPartyStep = ({...props}) => {
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
    saveState({PartySize: Number(partySize)});

    next();
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <Step2Container>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.elementbox}>
        <Header style={styles.title}>{tripData.title}</Header>
        <Paragraph>Please Confirm Party Size</Paragraph>
        <View style={styles.item}>
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
        </View>
      </View>
      <View style={[styles.buttonContainer, {width: width}]}>
        <TouchableHighlight style={[styles.sendButton]} onPress={back}>
          <Text style={[styles.buttonText]}>{'previous'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.sendButton]} onPress={cancel}>
          <Text style={[styles.buttonText]}>{'cancel'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.sendButton]} onPress={onNext}>
          <Text style={[styles.buttonText]}>{'next'}</Text>
        </TouchableHighlight>
      </View>
    </Step2Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  item: {
    paddingLeft: 2,
    width: '33%', // is 50% of container width
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textDecorationLine: 'underline',
    color: 'black',
  },
  elementbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
  },
  sendButton: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    height: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EE82EE',
  },
});

export default memo(ConfirmPartyStep);
