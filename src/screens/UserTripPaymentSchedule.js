import React, { memo, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { BackButton, HelpButton, PaymentTableResponsive } from '../components';
import { goBack, onScreen } from '../constants';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppOwnerName,
} from '../AppSettings';

const headers = [
  "Date",
  "Amount",
  "Paid",
]

const UserTripPaymentSchedule = ({ navigation, route }) => {
  const [userTripInfo] = useState(route.params);
  
  const payButton = (paymentAmount, paymentType) => {
    
    const dataObj = {
      amount: paymentAmount,
      type: paymentType
    }
    
    return (
      <Pressable style={styles.payButton} onPressIn={onScreen('MakePaymentScreen', navigation, dataObj)}>
      <Text>Pay</Text>
    </Pressable>
    )
  };

  const paidIcon = () => (
    <Icon size={25} name="check" color={AppHeaderTextColor} containerStyle={{ alignItems: 'center' }} />
  )

  const cashOnlyIcon = () => (
    <Icon size={28} name='badge-dollar' color={AppHeaderTextColor} containerStyle={{ alignItems: 'center' }} title="Test" />
  )

  const tableData =
    userTripInfo.Payments.map(records => (
      [
        records.isDeposit ? 'Now' : records.date,
        `$${records.amount}.00`,
        records.paid
          ? paidIcon()
          : records.isTip || records.isOther || userTripInfo.paymentType === 4
            ? cashOnlyIcon()
            : payButton(records.amount, userTripInfo.PaymentType)]
    ));

  return (
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
              <Text style={styles.instructionText}>Total Price For Your Trip: ${userTripInfo.TotalCost}.00</Text>
            </View>
            <PaymentTableResponsive rowData={tableData} paymentType={userTripInfo.PaymentType} headers={headers} />
            <View style={styles.instructionView}>
              <Text style={styles.instructionText}>Cash Only Payments? Look For $ Icon.
              Give to {AppOwnerName} in envelope with your name on it</Text>
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
});

export default memo(UserTripPaymentSchedule);
