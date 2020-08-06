import React, { memo, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import storage from '@react-native-firebase/storage';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor
} from '../AppSettings';
import { HelpButton } from '../components';
import Signature from 'react-native-signature-canvas';
import moment from 'moment';

const Step6 = ({...props}) => {
  const[loading, setLoading] = useState(true);
  const [signature, setSignature] = useState(null);
  const {next, cancel, back, saveState, getState} = props;
  const [currentDate, setCurrentDate] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [pdfFile, setPdfFile] = useState({});

  const handleSignature = userSignature => {
    setSignature(userSignature);
    const currentDT = moment(new Date()).format('YYYY-MM-DD');
    setCurrentDate(currentDT);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const style = `
    .m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }
  `;

  useEffect(() => {
    let loadingFile = true

    const getPDF = async () => {
      const url =
        await storage()
          .ref('trips/lLA84qhHx6JHZ0fK9Vii/SignturePage.pdf')
          .getDownloadURL();
      return url;
    };

    getPDF().then((data) => {
      setPdfFile({ uri: data })
    }).catch(err => console.log(err));
    setLoading(false);

    return function cleanup() {
      loadingFile = false
    }
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
          <Text style={styles.instructionText}>Double Tab To Zoom In</Text>
        </View>
        <WebView
          useWebKit={false}
          scrollEnabled={true}
          scalesPageToFit={true}
          source={pdfFile} />
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
