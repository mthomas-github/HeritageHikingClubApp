import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { CardDetail, BackButton } from '../components';
import { goBack, colors, onScreen } from '../constants';
import { Container } from '../styles';
import firestore from '@react-native-firebase/firestore';

const AdventureDetailScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(0);
  const [userTripInfo, setUserTripInfo] = useState(null);
  const tripSelected = route.params;

  const setButtonText = () => {
    switch (buttonStatus) {
      case 1:
        return 'Interested';
      case 2:
        return 'Pending';
      case 3:
        return 'Sign Up';
      case 4:
        return 'View Pay Schdule';
      case 5:
        return 'WaitList';
      case 6:
        return 'Trip Closed';
      default:
        return 'Intersted';
    }
  };

  const setNavigation = () => {
    switch (buttonStatus) {
      case 1:
        return onScreen('AdventureInterestedScreen', navigation, tripSelected);
      case 2:
        return 'Pending';
      case 3:
        return onScreen('AdventureSignupScreen', navigation, tripSelected);
      case 4:
        return onScreen('UserTripPaymentScreen', navigation, userTripInfo);
      case 5:
        return 'WaitList';
      case 6:
        return 'Trip Closed';
      default:
        return onScreen('AdventureInterestedScreen', navigation, tripSelected);
    }
  };

  useEffect(() => {
    setLoading(true);
    tripSelected.members.map(member => {
      if (member.userID === auth().currentUser.uid) {
        firestore()
          .collection('Users')
          .doc(member.userID)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.data();
            if (data.trips.length > 0) {
              if (data.Trips[0].tripId === tripSelected.key) {
                setButtonStatus(4);
                setUserTripInfo(data.Trips[0]);
              } else {
                setButtonStatus(3);
              }
            } else {
              setButtonStatus(3);
            }
          })
          .catch(e => console.log(e));
      } else {
        setButtonStatus(1);
      }
      setLoading(false);
    });
  }, [tripSelected.key, tripSelected.members]);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
      <Container>
        <BackButton goBack={goBack(navigation)} />
        <CardDetail
          item={tripSelected}
          buttonStyle={[
            buttonStatus === 2 ? styles.pendingButton : styles.interestedButton,
            styles.socalButton,
          ]}
          buttonText={setButtonText()}
          onPress={setNavigation()}
          disabled={buttonStatus === 2 ? true : false}
          icon={buttonStatus === 2 ? 'lock' : ''}
        />
      </Container>
    );
};

const styles = StyleSheet.create({
  interestedButton: {
    backgroundColor: '#4BB543',
  },
  pendingButton: {
    backgroundColor: colors.gray01,
  },
  socalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdventureDetailScreen;
