import React, { memo, useState, useEffect } from 'react';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppPaymentOwnerName
} from '../../AppSettings';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptionNonSave } from '../../utils';
import { Button, BackButton, HelpButton, Toast } from '../../components';
import { goBack, onScreen, randomFixedInteger } from '../../constants';

const MakePaymentScreen = ({ navigation, props }) => {

  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showManualButton, setShowManualButton] = useState(false);

  const processDocument = async (localPath) => {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(localPath);
    let foundPerson = false;
    let foundAmount = false;
    let foundCode = false;
    
    processed.blocks.map(block => {
      if (block.text.indexOf(AppPaymentOwnerName) > -1) foundPerson = true;
      if (block.text.indexOf(props.paymentAmount) > -1) foundAmount = true;
      if (block.text.indexOf(userCode) > -1) foundCode = true; 
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
          setToastMessage('Your Payment Succesfully Validated')
          goBack(navigation)();
        } else {
          setToastMessage('Oops! Unable to validate your payment')
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
              Making Payment With {'PaymentType'} &#38; Verifying
          </Text>
          </View>
          <View style={styles.instructionView}>
            <Text style={styles.instructionText}>
              1. Make payment for {'$100.00'} with Venmo sending it to @william-furey-2
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
              "You paid William Furey -$100.00 in message your unique code {userCode}".
              Take a screenshot and save it as an photo.
          </Text>
            <Text style={styles.instructionText}>
              5. Click on Verify Payment and upload the screen shot you just took
          </Text>
            <Button style={styles.buttonText} onPress={pickTranscationPicture}>Verify Payment</Button>
            {showManualButton && <Button style={styles.buttonText} onPress={''}>Manually Verify Payment</Button>}
          </View>
          <View style={styles.instructionView}>
            <Text style={styles.instructionText}>
              * If payment verfication fails you can retry again or click on manually
              verify payment.
          </Text>
          </View>
        </View>
        <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />

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
