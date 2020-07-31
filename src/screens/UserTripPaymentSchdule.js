import React, {memo, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Logo, Header, PaymentRow, Button, BackButton} from '../components';
import {Step2Container} from '../styles';
import {goBack, getPaymentTypeText, onScreen} from '../constants';

const {width} = Dimensions.get('window');

const UserTripPaymentSchdule = ({navigation, route, ...props}) => {
  const [userTripInfo] = useState(route.params);

  return (
    <Step2Container>
      <BackButton goBack={goBack(navigation)} />
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.elementbox}>
        <Header style={styles.title}>Payment Dates For Your Trip</Header>
        <Text style={styles.textHighlight}>
          You have chosen to{' '}
          {userTripInfo.PaymentOption === 1 ? 'pay in full' : 'make payments.'}
        </Text>
        <Text style={styles.textHighlight}>
          You have chosen to pay with{' '}
          {getPaymentTypeText(userTripInfo.PaymentType)}
        </Text>
        <Text style={styles.textHighlight}>
          ${userTripInfo.NonRefundTotal}.00 Deposit is non-refundable.
        </Text>
        <Text>Total Price For Your Trip: ${userTripInfo.TotalCost}.00</Text>
      </View>
      <View style={[styles.container, {width: width}]}>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Date'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Amount'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.textFee]}>{'Paid'}</Text>
        </View>
        {userTripInfo.Payments.map((payment, index) => (
          <PaymentRow
            paymentDate={payment.date}
            amount={payment.amount}
            cashOnly={payment.paid}
            deposit={payment.isDeposit}
            partySize={payment.PartySize}
            key={index}
          />
        ))}
        <View style={[styles.buttonContainer, {width: width}]}>
          <Button
            mode="contained"
            onPress={() => onScreen('MakePaymentScreen', navigation)()}>
            Make Payment
          </Button>
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
export default memo(UserTripPaymentSchdule);
