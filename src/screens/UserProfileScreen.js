import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
import DeviceInfo from 'react-native-device-info';
import {Button, InfoText, BaseIcon} from '../components';
import {colors, hhcId} from '../constants';
import {useUpload} from '../hooks';
import {imagePickerOptions} from '../utils';
import {logoutUser} from '../api/auth-api';
//Geocoder.init('AIzaSyATYprb4eLWXejFSBdBzSZwgwcz1n5FMaA');

const UserProfileScreen = ({}) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [{downloadURL, fileName}, monitorUpload] = useUpload();
  // const [pushNotification, setPushNotifications] = useState(false);
  const [currentLocation, setcurrentLocation] = useState('');

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const {didCancel, error} = imagePickerResponse;
      if (didCancel) {
        console.log('Canceled');
      } else if (error) {
        console.log('An error occurred: ', error);
      } else if (userData.avatarFileName || fileName) {
        let change = '';
        if (fileName) {
          change = fileName;
        } else {
          change = userData.avatarFileName;
        }
        storage()
          .ref('avatars/' + change)
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

  // const onChangePushNotications = () => {
  //   if (pushNotification) {
  //     setPushNotifications(false);
  //   } else {
  //     setPushNotifications(true);
  //   }
  // };

  const getLocation = () => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     Geocoder.from(position.coords.latitude, position.coords.longitude)
    //       .then(json => {
    //         setcurrentLocation(json.results[0].address_components[2].long_name);
    //       })
    //       .catch(err => console.log(err))
    //       .done(() => {
    //         firestore()
    //           .collection('Users')
    //           .doc(userId)
    //           .set({userLocation: `${currentLocation}`}, {merge: true});
    //       });
    //   },
    //   error => {
    //     console.log(error.code, error.messaage);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 100000,
    //   },
    // );
  };

  const activeAccount = () => {
    LoginManager.logInWithPermissions([
      'public_profile, email, groups_access_member_info',
    ])
      .then(result => {
        if (result.isCancelled) {
          console.log('Login Cancelled');
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=id,name,groups',
            null,
            _responseInfoCallback,
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      })
      .catch(err => console.log(err));
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      const inHHC = result.groups.data.some(data => data.id === hhcId);
      const db = firestore()
        .collection('Users')
        .doc(userId);
      db.set({FBGroups: result.groups.data, isHHC: inHHC}, {merge: true});
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Account',
      'Do you want to continue deleting your account?',
      [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES',
          onPress: () => {
            doDeleteAccount();
          },
        },
      ],
    );
  };

  const doDeleteAccount = () => {
    setUserData({
      avatar: null,
      name: '',
      totHikes: 0,
      totMiles: '0.0',
      lastHikeDays: 0,
      userLocation: '',
      isHHC: false,
      FBGroups: [],
    });
    storage()
      .ref('avatars/' + userData.avatarFileName)
      .delete()
      .catch(error => console.info('Storage', error))
      .done(() => {
        firestore()
          .collection('Users')
          .doc(userId)
          .delete()
          .catch(error => console.info('FireStore', error));
      });

    auth()
      .currentUser.delete()
      .then(() => logoutUser)
      .catch(error => console.info('Auth', error));
  };

  useEffect(() => {
    let userid = '';
    try {
      userid = auth().currentUser.uid;
    } catch (ex) {
      console.log(ex);
    }
    setUserId(userid);
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data());
        setLoading(false);
      });

    if (downloadURL && fileName != null) {
      const uploadUserInfo = firestore()
        .collection('Users')
        .doc(userId);

      uploadUserInfo.set(
        {
          avatarFileName: fileName,
          avatar: downloadURL,
        },
        {merge: true},
      );
    }
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [downloadURL, fileName, monitorUpload.fileName, userData, userId]);

  if (userData === undefined) {
    return (
      <View>
        <Text>Account is Deleted</Text>
      </View>
    );
  }

  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innercontainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={uploadFile}>
              {userData !== undefined &&
                (userData.avatar === null ? (
                  <Image
                    source={require('../assets/tempAvatar.jpg')}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={{uri: userData.avatar}}
                    style={styles.avatar}
                  />
                ))}
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>
            {userData !== undefined && (userData.name ? userData.name : '')}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {userData !== undefined &&
                (userData.totHikes ? userData.totHikes : 0)}
            </Text>
            <Text style={styles.statTitle}>Total Hikes</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {userData !== undefined &&
                (userData.totMiles ? userData.totMiles : 0)}
            </Text>
            <Text style={styles.statTitle}>
              Total Miles ({new Date().getFullYear()})
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {userData !== undefined &&
                (userData.lastHikeDays ? userData.lastHikeDays : 0)}
            </Text>
            <Text style={styles.statTitle}>Since Last Hike (Days)</Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
          {/* <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={onChangePushNotications}
                value={pushNotification}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainer}
                icon={{
                  name: 'bell',
                }}
              />
            }
          /> */}
          <ListItem
            title="Location"
            rightTitle={
              userData !== undefined &&
              (userData.userLocation ? userData.userLocation : '')
            }
            rightTitleStyle={styles.locationFontSize}
            onPress={getLocation}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainerLocation}
                icon={{
                  name: 'map-marker-alt',
                }}
              />
            }
            chevron
          />
          <ListItem
            title="Account Status"
            rightTitle={
              userData !== undefined &&
              (userData.isHHC ||
              userData.FBGroups.find(data => data.id === hhcId)
                ? 'Active'
                : 'Click To Activate')
            }
            rightTitleStyle={styles.locationAccountStatusFontSize}
            onPress={userData.isHHC ? null : activeAccount}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainerFB}
                icon={{
                  name: 'user-lock',
                }}
              />
            }
            chevron
          />
          <ListItem
            title="Delete Account"
            rightTitle="Click To Delete"
            rightTitleStyle={styles.locationAccountStatusFontSize}
            onPress={confirmDelete}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainerDelete}
                icon={{
                  name: 'exclamation-triangle',
                }}
              />
            }
            chevron
          />
        </View>
        <InfoText text="Support" />
        <View>
          <ListItem
            title="App Version"
            rightTitle={DeviceInfo.getVersion()}
            rightTitleStyle={styles.locationFontSize}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainerAppVersion}
                icon={{
                  name: 'info',
                }}
              />
            }
          />
          {/* <ListItem
            title="Submit FeedBack"
            rightTitle="Submit"
            rightTitleStyle={styles.locationFontSize}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={styles.baseContainerBug}
                icon={{
                  name: 'bug',
                }}
              />
            }
            chevron
          /> */}
        </View>
        <Button onPress={logoutUser} style={styles.button} compact={true}>
          Log out
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b2fe',
  },
  innercontainer: {
    marginTop: 64,
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: '#4F566D',
    fontSize: 18,
    fontWeight: '600',
  },
  statTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600',
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  baseContainer: {
    backgroundColor: '#FFADF2',
  },
  locationFontSize: {
    fontSize: 15,
  },
  locationAccountStatusFontSize: {
    fontSize: 15,
    marginLeft: -25,
  },
  baseContainerLocation: {
    backgroundColor: '#57DCE7',
  },
  baseContainerFB: {
    backgroundColor: '#3966B8',
  },
  baseContainerDelete: {
    backgroundColor: '#CA0B00',
  },
  baseContainerAppVersion: {
    backgroundColor: '#63e5ff',
  },
  baseContainerBug: {
    backgroundColor: '#3cdfff',
  },
  deleteAccountButton: {
    backgroundColor: '#CA0B00',
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

export default memo(UserProfileScreen);
