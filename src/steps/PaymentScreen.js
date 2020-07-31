import React, {useEffect, useState, memo} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {Step2Container} from '../styles';
import {Logo, Header, RadioButton} from '../components';

const {width} = Dimensions.get('window');

const ConfirmPartyStep = ({...props}) => {
  const [loading, setLoading] = useState(false);
  const {back, cancel, next, saveState, getState} = props;
  const [paymentType, setPaymentType] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [depositAmount, setDeposit] = useState(null);
  const [fullAmount, setFullAmount] = useState(null);

  useEffect(() => {
    setLoading(true);
    const stepState = getState();
    const tripData = props.getTrip();
    tripData.payments.map(p => {
      if (p.isDeposit) {
        setDeposit(Number(p.amount) * stepState.PartySize);
      }
    });
    setFullAmount(Number(tripData.tripPrice) * stepState.PartySize);
    setLoading(false);
  }, [getState, props]);

  const paymentTypesOptions = [
    {
      key: 1,
      text: 'Venmo',
      instruction: 'send to @william-furey-2',
    },
    {
      key: 2,
      text: 'Zelle',
      instruction: 'send to b_furey@yahoo.com',
    },
    {
      key: 3,
      text: 'Check',
      instruction: 'payable to Bill Furey',
    },
    {
      key: 4,
      text: 'Cash',
      instruction: 'envelope with name on it',
    },
  ];

  const paymentOptions = [
    {
      key: 1,
      text: 'Payment in Full',
    },
    {
      key: 2,
      text: 'Payments',
    },
  ];

  const _onPaymentTypeClick = clickedItem => {
    setPaymentType(clickedItem);
  };

  const _onPaymentClick = paymentOptionClicked => {
    setPaymentOption(paymentOptionClicked);
    paymentOptionClicked === 2
      ? saveState({AmountDue: depositAmount})
      : saveState({AmountDue: fullAmount});
  };

  const onNext = () => {
    saveState({PaymentType: paymentType, PaymentOption: paymentOption});
    next();
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <Step2Container>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.elementbox}>
        <Header style={styles.title}>Payment Screen</Header>
      </View>
      <RadioButton
        options={paymentTypesOptions}
        onClick={_onPaymentTypeClick}
        value={paymentType}
      />
      {paymentType === 4 || paymentType === 3 ? (
        <Text style={styles.additonalIntro}>
          * Give {paymentType} to Bill on next hike{' '}
          {paymentType === 3 && (
            <Text>
              or mail to Mr. Bill Furey 1421 Samp Ln, Placentia CA, 92870
            </Text>
          )}
        </Text>
      ) : null}
      <View style={[styles.container, {width: width}]}>
        <View style={styles.item}>
          <Text>Amount Due:</Text>
        </View>
        <View style={styles.item}>
          <Text>
            ${paymentOption === 1 ? fullAmount : null}
            {paymentOption === 2 ? depositAmount : null}
          </Text>
        </View>
      </View>
      <View style={styles.radioPaymentView}>
        <RadioButton
          options={paymentOptions}
          onClick={_onPaymentClick}
          value={paymentOption}
        />
      </View>
      <View style={[styles.buttonContainer, {width: width}]}>
        <TouchableHighlight style={[styles.sendButton]} onPress={back}>
          <Text style={[styles.buttonText]}>{'previous'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.sendButton]} onPress={cancel}>
          <Text style={[styles.buttonText]}>{'cancel'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.sendButton]} onPress={onNext}>
          <Text style={[styles.buttonText]}>{'next'}</Text>
        </TouchableHighlight>
      </View>
    </Step2Container>
  );
};

const styles = StyleSheet.create({
  radioPaymentView: {
    paddingTop: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start', // if you want to fill rows left to right
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  item: {
    paddingLeft: 2,
    width: '33%', // is 50% of container width
  },
  additonalIntro: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    textDecorationLine: 'underline',
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  elementbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 15,
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

export default memo(ConfirmPartyStep);
