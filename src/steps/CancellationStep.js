import React, {memo, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Signature from 'react-native-signature-canvas';
import Unorderedlist from 'react-native-unordered-list';
import moment from 'moment';
import {Logo} from '../components';

const CancellationStep = ({...props}) => {
  const [signature, setSignature] = useState(null);
  const {next, cancel, back, saveState, getState} = props;
  const [currentDate, setCurrentDate] = useState(null);
  const [visible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.textaCancellation}>Cancellation Policy</Text>
      <Text style={styles.cancelText}>
        If you decide to cancel your reservation for{' '}
        <Text
          style={[
            styles.txtColorRed,
            styles.underLineText,
            styles.fontWeightText,
          ]}>
          ANY
        </Text>{' '}
        reason, the following fees apply at thee time (prior to depature) we
        recieve <Text style={styles.underLineText}>written notice</Text> of your
        cancellation. No refunds or transfer without prior approval by Bill
        Furey.{' '}
        <Text style={[styles.txtColorRed, styles.fontWeightText]}>
          50% of your Deposit is non-refundable.
        </Text>
      </Text>
      <View style={[styles.uiView]}>
        <View style={styles.item}>
          <Unorderedlist>
            <Text>Before December 1, 2019</Text>
          </Unorderedlist>
        </View>
        <View style={styles.item}>
          <Text>{'50% refunded / 50% deposit (non-refundable)'}</Text>
        </View>
        <View style={styles.item}>
          <Unorderedlist>
            <Text>Before February 1, 2020</Text>
          </Unorderedlist>
        </View>
        <View style={styles.item}>
          <Text>{'25% refunded'}</Text>
        </View>
        <View style={styles.item}>
          <Unorderedlist>
            <Text>After February 2, 2020</Text>
          </Unorderedlist>
        </View>
        <View style={styles.item}>
          <Text>
            No refund available for{' '}
            <Text style={[styles.txtColorRed, styles.fontWeightText]}>ANY</Text>{' '}
            reason
          </Text>
        </View>

        <Text style={styles.cancelText}>
          Please sign that you agree to your 1/2 Non-Refund Deposit {'& '}
          Cancellation Policy
        </Text>
      </View>
      <View style={[styles.sigView]}>
        <View style={styles.sigItem}>
          <Text>Signature:X</Text>
        </View>
        <View style={styles.sigItem}>
          {signature ? (
            <Image
              source={{uri: signature}}
              resizeMode={'contain'}
              style={styles.signatureImage}
            />
          ) : null}
        </View>
        <View style={styles.sigItem}>
          <Text>Date: {currentDate}</Text>
        </View>
      </View>
      <View style={styles.signatureView}>
        <Signature
          onOK={handleSignature}
          onEmpty={handleEmpty}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.sendButton]} onPress={back}>
          <Text style={[styles.buttonText]}>{'previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sendButton]} onPress={cancel}>
          <Text style={[styles.buttonText]}>{'cancel'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton]}
          onPress={next}
          disabled={signature ? false : true}>
          <Text style={[styles.buttonText]}>{'next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signatureImage: {
    width: 150,
    height: 50,
    marginTop: -15,
    marginLeft: -65,
  },
  signatureView: {
    height: 175,
    paddingTop: 20,
    paddingBottom: 10,
  },
  uiView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'yellow',
  },
  sigView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    paddingLeft: 2,
    paddingTop: 2,
    width: '50%', // is 50% of container width
  },
  sigItem: {
    paddingLeft: 2,
    paddingTop: 5,
    width: '33%', // is 50% of container width
  },

  cancelText: {paddingLeft: 5, paddingTop: 5},
  underLineText: {
    textDecorationLine: 'underline',
  },
  fontWeightText: {fontWeight: '600'},
  txtColorRed: {color: 'red'},
  textaCancellation: {
    paddingLeft: 5,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#00b2fe',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  sendButton: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    height: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EE82EE',
  },
});

export default memo(CancellationStep);
