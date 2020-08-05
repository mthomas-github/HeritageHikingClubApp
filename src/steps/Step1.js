import React, { memo} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppSignupProcessTimer
} from '../AppSettings';
import { HelpButton } from '../components';

const Step1 = ({ navigation, ...props }) => {
  const { next, cancel } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <HelpButton style={styles.helpButton} />
      </View>
      <View style={[styles.elementsContainer]}>
        <View>
          <Text style={styles.headerStyle}>
            Trip Sign Up Process
          </Text>
        </View>
        <View style={styles.instructionView}>
          <Text style={styles.instructionText}>
            Congratulations! You're now going to sign up for your trip.
            Over the next couple of steps you will confirm a few details, add everyones name
            and email who is in your party. After confirming party info you will
            be required to sign 2 documents. Then finally you will need to
            choose how you're going to pay for your adventure.
          </Text>
          <Text style={[styles.instructionText, styles.paddingTop5]}>
            You will have {AppSignupProcessTimer} minutes to complete the sign up process your seats will be forfited.
            So if you're ready please click start.
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonText} onPressIn={cancel}><Text>Cancel</Text></Pressable>
            <Pressable style={styles.buttonText} onPressIn={next}><Text>Proceed</Text></Pressable>
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

export default memo(Step1);
