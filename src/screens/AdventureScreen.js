import React, {memo, useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Logo, Paragraph, Card, Button} from '../components';
import {onScreen} from '../constants';
import {logoutUser} from '../api/auth-api';

const AdventureScreen = ({navigation}) => {
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

  const _renderItem = ({item}) => {
    if (item !== null) {
      return (
        <Card
          item={item}
          onPress={onScreen('AdventureDetailScreen', navigation, item)}
        />
      );
    }
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      {trips === null || trips.length <= 0 || !inHHC ? (
        <>
          <Logo />
          <Paragraph>
            {inHHC
              ? 'No Trips Current, Please checkback later'
              : 'Please goto User Profile, and active account'}
          </Paragraph>
        </>
      ) : (
        <FlatList
          scrollEventThrottle={16}
          data={trips}
          renderItem={_renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={null}
        />
      )}
      <Button onPress={logoutUser} style={styles.button} compact={true}>
        Log out
      </Button>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 85,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b2fe',
  },
});

export default memo(AdventureScreen);
