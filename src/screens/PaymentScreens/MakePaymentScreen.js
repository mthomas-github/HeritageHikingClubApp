import React, { memo, useState } from 'react';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
} from '../../AppSettings';
import { Text, View, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptions } from '../../utils';
import { useUpload } from '../../hooks';
import { Button, BackButton, HelpButton } from '../../components';
import { goBack } from '../../constants';

const MakePaymentScreen = ({ navigation }) => {
  const [{ downloadURL }, monitorUpload] = useUpload();
  const [ocrresponse, setOCRResponse] = useState('');
  const pickImage = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        console.log('Canceled');
      } else if (error) {
        console.log('An error occurred: ', error);
      } else {
        monitorUpload(imagePickerResponse);
      }
    });
  };

  submitToGoogle = async () => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "TEXT_DETECTION", maxResults: 5 },
            ],
            image: {
              source: {
                imageUri: downloadURL
              }
            },
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyATYprb4eLWXejFSBdBzSZwgwcz1n5FMaA",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      //setOCRResponse(responseJson);
      console.log(JSON.stringify(responseJson.responses));
    } catch (error) {
      console.log(error);
    }
  };


  return (
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
          <Text style={styles.instructionText}>1. Choose payment amount.</Text>
          <Text style={styles.instructionText}>
            1. Make payment with Venmo sending it to @william-furey-2
          </Text>
          <Text style={styles.instructionText}>
            2. In the message please put this code {'random code for user'},
            also choose private.
          </Text>
          <Text style={styles.instructionText}>
            3. Find the transcation that you just completed, and select it.
          </Text>
          <Text style={styles.instructionText}>
            4. You should now see "You Paid William Fury" with dollar amount and
            special code. Now take a screen shot and save it'
          </Text>
          <Text style={styles.instructionText}>
            5. Click on Verify Payment and upload the screen shot you just took
          </Text>
          <Button style={styles.buttonText} onPress={pickImage}>Verify Payment</Button>
          <Button style={styles.buttonText} onPress={submitToGoogle}>Manually Verify Payment</Button>
        </View>
        <View style={styles.instructionView}>
          <Text style={styles.instructionText}>
            * If successful you will see a check mark next to payment you. If
            payment verfication fails you can retry again or click on manually
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
  },
  instructionView: {
    flex: 1,
    flexWrap: 'nowrap',
  },
});

export default memo(MakePaymentScreen);
