import React, {memo, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Logo, Header, PaymentRow} from '../components';
import {Step2Container} from '../styles';
const {width} = Dimensions.get('window');
const FeeScheduleStep = ({...props}) => {
  const {next, cancel, back, saveState, getState} = props;
  const [loading, setLoading] = useState(false);
  const [nonRefund, setNonRefund] = useState();
  const [paymentSchedule, setPaymentSchdeule] = useState([]);
  const userData = getState();
  const tripData = props.getTrip();
  useEffect(() => {
    setLoading(true);
    tripData.payments.map(payment => {
      if (payment.isDeposit) {
        setNonRefund(payment.amount * userData.PartySize);
      }

      let query = {
        date: payment.date,
        amount: payment.amount * userData.PartySize,
        isCash: payment.isCash,
        isDeposit: payment.isDeposit,
        isFinalPayment: payment.isFinalPayment,
        isOther: payment.isOther,
        isTip: payment.isTip,
        paid: false,
      };
      setPaymentSchdeule(p => [...p, query]);
    });
    setLoading(false);
  }, [tripData.payments, userData.PartySize, userData.partySize]);

  const onNext = () => {
    saveState({
      Payments: paymentSchedule,
      TripCost: Number(tripData.tripPrice) * userData.PartySize,
      NonRefundTotal: Number(nonRefund),
    });

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
        <Header style={styles.title}>
          Important dates for {tripData.title}
        </Header>
        <Text style={styles.title}>Fee schedule</Text>
        <Text style={styles.textHighlight}>
          You may pay in full or follow payment plan below. ${nonRefund}.00
          Deposit is non-refundable.
        </Text>
        <Text>Cash Only ? put name on envelope with your name on it</Text>
        <Text>
          Total Price: ${Number(tripData.tripPrice) * userData.PartySize}.00
        </Text>
      </View>

      <View style={[styles.container, {width: width}]}>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Date'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Amount'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Cash Only'}</Text>
        </View>
        {paymentSchedule.map((payment, index) => (
          <PaymentRow
            paymentDate={payment.date}
            amount={payment.amount}
            cashOnly={payment.isCash}
            deposit={payment.isDeposit}
            partySize={userData.PartySize}
            key={index}
          />
        ))}
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
      </View>
    </Step2Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  icon: {
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    paddingLeft: 2,
    borderWidth: 1,
    width: '33%', // is 50% of container width
  },
  textFee: {
    fontSize: 17,
    fontWeight: '500',
  },
  textFeeAmount: {
    color: 'red',
  },
  textFeeNotes: {
    backgroundColor: '#FDFF00',
  },
  logo: {
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textDecorationLine: 'underline',
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textHighlight: {
    backgroundColor: '#FDFF00',
    fontSize: 12,
    alignItems: 'center',
  },
  feeSchdule: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-evenly',
  },
  feeSchduleStart: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-evenly',
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
export default memo(FeeScheduleStep);
