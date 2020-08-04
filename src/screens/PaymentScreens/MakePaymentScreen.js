import React, { memo, useState, useEffect } from 'react';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppPaymentOwnerName
} from '../../AppSettings';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { imagePickerOptionNonSave } from '../../utils';
import { Button, BackButton, HelpButton } from '../../components';
import { goBack, randomFixedInteger, getPaymentTypeTextInstuction, getPaymentTypeText } from '../../constants';

const MakePaymentScreen = ({ navigation, route, props }) => {
  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showManualButton, setShowManualButton] = useState(false);
  const [data] = useState(route.params);

  const processDocument = async (localPath) => {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(localPath);
    let foundPerson = false;
    let foundAmount = false;
    let foundCode = false;
    const regExpUserCode = new RegExp(`\\b${userCode}\\b`, 'gi')
    const regExpOwnerName = new RegExp(`\\b${AppPaymentOwnerName}\\b`, 'gi')
    const regExpAmount = new RegExp(`\\b${userTripInfo.amount}\\b`, 'gi')
    processed.blocks.map(block => {
      if (block.text.match(regExpOwnerName) !== null) foundPerson = true;
      if (block.text.match(regExpAmount) !== null) foundAmount = true;
      if (block.text.match(regExpUserCode) !== null) foundCode = true; 
    });

    if (foundPerson && foundAmount && foundCode) {
      return true;
    } else {
      return false;
    }
  }

  const pickTranscationPicture = () => {
    ImagePicker.launchImageLibrary(imagePickerOptionNonSave, response => {
      const { didCancel, error } = response;
      if (didCancel) {
        console.log('Canceled');
      } else if (error) {
        console.log('An error occurred: ', error);
      } else {
        let source = response.uri;
        submitToGoogle(source);
      }
    });
  }

  const submitToGoogle = (filePath) => {
    setToastMessage('Validating Payment');
    processDocument(filePath)
      .then()
      .catch(e => console.log(e))
      .done((validPayment) => {
        if (validPayment) {
          Toast.showWithGravity('Your Payment Succesfully Validated', Toast.SHORT, Toast.TOP);
          goBack(navigation)();
        } else {
          Toast.showWithGravity('Oops! Unable to validate your payment', Toast.LONG, Toast.TOP);
          setShowManualButton(true);
        }

      });
  }

  useEffect(() => {
    setLoading(true);
    setUserCode(() => randomFixedInteger(6));
    setLoading(false);
  }, []);

  return loading ?
    <ActivityIndicator size='large' />
    : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <BackButton style={styles.backButton} goBack={goBack(navigation)} />
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Text style={styles.headerStyle}>
              Making Payment With {getPaymentTypeText(data.userTripData.PaymentType)} &#38; Verifying
          </Text>
          </View>
          <View style={styles.instructionView}>
            <Text style={styles.instructionText}>
              1. Make payment for ${data.userTripData.Payments[data.clickTripIndex].amount}.00 with {getPaymentTypeTextInstuction(data.userTripData.PaymentType)}
          </Text>
            <Text style={styles.instructionText}>
              2. In the message please put this code: {userCode},
            also choose private. Click Pay.
          </Text>
            <Text style={styles.instructionText}>
              3. Find the transcation that you just completed, and select it.
          </Text>
            <Text style={styles.instructionText}>
              4. Your transcation should say the following:
              "You paid William Furey -${data.userTripData.Payments[data.clickTripIndex].amount}.00 {userCode}".
              Take a screenshot and save it as an photo.
          </Text>
            <Text style={styles.instructionText}>
              5. Click on Verify Payment and upload the screen shot you just took
          </Text>
            <Button style={styles.buttonText} onPress={pickTranscationPicture}>Verify Payment</Button>
            {showManualButton && <Button style={styles.buttonText} onPress={goBack(navigation)}>Manually Verify Payment</Button>}
          </View>
          <View style={styles.instructionView}>
            <Text style={styles.instructionText}>
              * If payment verfication fails you can retry again or click on manually
              verify payment.
          </Text>
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
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    flex: 1,
  },
  buttonText: {
    backgroundColor: AppActionButtonColor,
    color: AppTextColor,
  },
  instructionText: {
    color: AppTextColor,
    paddingBottom: 3,
  },
  instructionView: {
    flex: 1,
    flexWrap: 'nowrap',
  },
});

export default memo(MakePaymentScreen);
