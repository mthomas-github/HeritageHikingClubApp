import React, {memo, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Logo, Header, PaymentRow, Button, BackButton, HelpButton} from '../components';
import {Step2Container} from '../styles';
import {goBack, getPaymentTypeText, onScreen} from '../constants';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppPaymentOwnerName
} from '../AppSettings';
const {width} = Dimensions.get('window');

const UserTripPaymentSchdule = ({navigation, route, ...props}) => {
  const [userTripInfo] = useState(route.params);
  const [loading, setLoading] = useState(false);


  return loading ?
    <ActivityIndicator size='large' /> : (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <BackButton style={styles.backButton} goBack={goBack(navigation)} />
        <HelpButton style={styles.helpButton} />
      </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Text style={styles.headerStyle}>
              Payment Dates
            </Text>
            <View style={styles.instructionView}>
              <Text>Total Price For Your Trip: ${userTripInfo.TotalCost}.00</Text>
            </View>
            <View style={[styles.paymentContainer], {width: width}}>
              {userTripInfo.Payments.map((payment, index) => (
                <PaymentRow
                  paymentDate={payment.date}
                  amount={payment.amount}
                  cashOnly={payment.isTip || payment.isOther}
                  deposit={payment.isDeposit}
                  partySize={payment.PartySize}
                  feeSchduleScreen={false}
                  key={index}
                />
              ))}
            </View>
          </View>
        </View>
      {/* <View style={styles.elementbox}>
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
            cashOnly={payment.isTip || payment.isOther}
            deposit={payment.isDeposit}
            partySize={payment.PartySize}
            feeSchduleScreen={false}
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
      </View> */}
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
    flex: 0,
  },
  buttonText: {
    backgroundColor: AppActionButtonColor,
    color: AppTextColor,
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
  paymentContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'flex-start', // if you want to fill rows left to right
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 10,
//   },
//   icon: {
//     alignItems: 'center',
//     alignContent: 'center',
//   },
//   item: {
//     paddingLeft: 2,
//     borderWidth: 1,
//     width: '33%', // is 50% of container width
//   },
//   textFee: {
//     fontSize: 17,
//     fontWeight: '500',
//   },
//   textFeeAmount: {
//     color: 'red',
//   },
//   textFeeNotes: {
//     backgroundColor: '#FDFF00',
//   },
//   logo: {
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     textDecorationLine: 'underline',
//     color: 'black',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   textHighlight: {
//     backgroundColor: '#FDFF00',
//     fontSize: 12,
//     alignItems: 'center',
//   },
//   feeSchdule: {
//     flexDirection: 'row',
//     paddingTop: 10,
//     justifyContent: 'space-evenly',
//   },
//   feeSchduleStart: {
//     flexDirection: 'row',
//     paddingTop: 10,
//     justifyContent: 'space-evenly',
//   },
//   elementbox: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 10,
//     paddingRight: 15,
//   },
//   sendButton: {
//     flexDirection: 'row',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignContent: 'center',
//     width: 100,
//     height: 45,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#EE82EE',
//   },
// });
export default memo(UserTripPaymentSchdule);
