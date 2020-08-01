import React, { memo, useState, useEffect } from 'react';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../../AppSettings';
import { Text, View, StyleSheet } from 'react-native';
import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptions } from '../../utils';
import { useUpload } from '../../hooks';
import { Button, BackButton, HelpButton, Toast } from '../../components';
import { goBack, onScreen } from '../../constants';
import { ActivityIndicator } from 'react-native-paper';

const MakePaymentScreen = ({ navigation }) => {

  const [validPerson, setValidPerson] = useState(false);
  const [validAmount, setValidAmount] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showManualButton, setShowManualButton] = useState(false);

  const processDocument = async (localPath) => {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(localPath);

    processed.blocks.forEach(block => {
      if (block.text.includes('William Furey')) {
        if (!validPerson) {
          setValidPerson(true)
        }
      } 

      if (block.text.includes('$498.00')) {
        if (!validAmount)
          setValidAmount(true)
      } 

      if (block.text.includes(userCode)) {
        setValidCode(true);
      } 
    });
  }

  const randomFixedInteger = (length) => {
    let userCode = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    return userCode;
  }

  const imagePickerOptions = {
    quality: 0.7,
    allowsEditing: true,
    mediaType: 'photo',
    noData: true,
    storageOptions: {
      skipBackup: true,
      waituntilSaved: false,
      path: 'images',
      cameraRoll: true,
    },
  };

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
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
      .then(() => setToastMessage('Completed Payment Validation'))
      .catch(e => console.log(e))
      .done(() => {
        console.log('P: ', validPerson, 'A: ', validAmount, 'C: ', validCode);
        if (validPerson && validAmount && validCode) {
          setToastMessage('Your Payment Succesfully Validated')
          goBack(navigation)();
        } else {
          setToastMessage('Oops! Unable to validate your payment')
          setShowManualButton(true);
        }
        setValidAmount(false);
        setValidCode(false);
        setValidPerson(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    let userCode = randomFixedInteger(6);
    setUserCode(userCode);
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
            <Button style={styles.buttonText} onPress={chooseImage}>Verify Payment</Button>
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
