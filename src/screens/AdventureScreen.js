import React, { memo, useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Logo, Card, HelpButton } from '../components';
import { onScreen } from '../constants';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../AppSettings';
import { activateAccount } from '../api/fb';

const AdventureScreen = ({ navigation }) => {
  const userId = auth().currentUser.uid;
  const [inHHC, setHHC] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        let userData =
          documentSnapshot.data() === undefined
            ? null
            : documentSnapshot.data();
        if (userData !== null) {
          if (userData.isAdmin || userData.isMod || userData.isSuper) {
            setHHC(true);
          } else {
            setHHC(userData.isHHC);
          }
        }
        setLoading(false);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  });

  useEffect(() => {
    const tripSubscriber = firestore()
      .collection('Trips')
      .onSnapshot(querySnapshot => {
        const querytrips = [];
        querySnapshot.forEach(documentSnapshot => {
          querytrips.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTrips(querytrips);
        setLoading(false);
      });

    return () => tripSubscriber();
  }, []);

  const activeAccountFB = () => {
    activateAccount()
    .then(() => Toast.showWithGravity('Activated Success Fully', Toast.TOP, Toast.LONG))
    .catch(() => Toast.showWithGravity('There was a Problem', Toast.TOP, Toast.LONG));
  }

  const renderItem = ({ item }) => {
    if (item !== null) {
      return (
        <Card
          item={item}
          onPress={onScreen('AdventureDetailScreen', navigation, item)}
        />
      );
    }
  };

  const renderNoTrips = () => (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <HelpButton style={styles.helpButton} />
      </View>
      <View style={[styles.elementsContainer]}>
        <View>
          <Logo />
        </View>
        <View style={styles.buttonContainer}>
          {inHHC ? '' : (
            <Pressable style={styles.buttonText} onPress={activeAccountFB}>
              <Text>Activate Account</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )

  const renderTrips = () => (
    <FlatList
      scrollEventThrottle={16}
      data={trips}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={null}
    />
  )

  return loading
    ? <ActivityIndicator size='large' />
    : trips === null
      || trips.length <= 0
      || !inHHC ? renderNoTrips()
      : renderTrips()
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
  instructionText: {
    color: AppTextColor,
    paddingBottom: 3,
    textAlign: 'center'
  },
  instructionView: {
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
  payButton: {
    alignSelf: 'center',
    backgroundColor: AppActionButtonColor,
    paddingLeft: 40,
    paddingRight: 40
  },
  iconWrapper: {
    alignItems: 'center'
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
});

export default memo(AdventureScreen);
