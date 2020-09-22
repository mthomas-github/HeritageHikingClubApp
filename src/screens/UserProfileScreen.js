import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable
} from 'react-native';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../AppSettings';
import {HelpButton, BackButton} from '../components';
import {goBack} from '../constants';

const UserProfileScreen = ({}) => {
  const [loading, setLoading] = useState(true);

  const activeAccount = () => {
    
  };



  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <BackButton style={styles.backButton} goBack={goBack(navigation)} />
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Text style={styles.headerStyle}>
             User Profile
          </Text>
          </View>
          <View style={styles.inputView}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonText} onPress={activeAccount}><Text></Text></Pressable>
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

export default memo(UserProfileScreen);
