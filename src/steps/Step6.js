import React, { memo, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast'
import functions from '@react-native-firebase/functions';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppSettingsContractName,
  AppSettingsContractEmail,
} from '../AppSettings';
import { HelpButton } from '../components';

const Step6 = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const { next, cancel, back, saveState, getState } = props;

  if (__DEV__) {
    functions().useFunctionsEmulator('http://localhost:5001');
  }

  useEffect(() => {
    functions()
      .httpsCallable('sendSignRequest') ({
        membersEmail: getState().partyInfo[0].email,
        sendersName: AppSettingsContractName,
        sendersEmail: AppSettingsContractEmail
      })
      .then(response => {
        console.log(response.message);
        Toast.showWithGravity(response.data, Toast.LONG, Toast.TOP);
        setLoading(false);
      }).catch(() => Toast.showWithGravity('There was a problem', Toast.LONG, Toast.TOP));
  }, [])

  return loading ? <ActivityIndicator size='large' /> : (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <HelpButton style={styles.helpButton} />
      </View>
      <View style={[styles.elementsContainer]}>
        <View>
          <Text style={styles.headerStyle}>
            Cancellation Policy &amp; Liability Release
            </Text>
        </View>
        <View style={styles.instructionView}>
          <Text style={styles.instructionText}>
            We are now creating the Cancellation Policy &amp; Liability Release document, once you see successful
            you should recieve an email, please review it and sign it. if error please click try agian. 
            You only have 24 hrs to sign document or you will lose your seat.
          </Text>
        </View>
        <View style={styles.instructionView}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonText} onPressIn={back}><Text>Back</Text></Pressable>
            <Pressable style={styles.buttonText} onPressIn={cancel}><Text>Cancel</Text></Pressable>
            <Pressable style={styles.buttonText} onPressIn={next}><Text>Next</Text></Pressable>
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
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    width: 100,
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 50,
    marginLeft: 12,
  },
});

export default memo(Step6);
