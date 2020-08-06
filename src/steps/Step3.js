import React, { memo, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor
} from '../AppSettings';
import { HelpButton, PaymentTableResponsive } from '../components';

const headers = [
  "Date",
  "Amount",
  "Cash Only",
]

const Step3 = ({ ...props }) => {
  const { next, cancel, back, saveState, getState } = props;
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [nonRefundAmount, setNonRefundAmount] = useState();
  const [userPaymentSchdeule, setUserPaymentSchedule] = useState([])
  const userData = getState();
  const tripData = props.getTrip();

  const NonCashIcon = () => (
    <Icon size={25} name="times" color={AppHeaderTextColor} containerStyle={{ alignItems: 'center' }} />
  )

  const cashOnlyIcon = () => (
    <Icon size={28} name='badge-dollar' color={AppHeaderTextColor} containerStyle={{ alignItems: 'center' }} />
  )
  useEffect(() => {
    setLoading(true);
    const tableData =
      tripData.payments.map(records => (
        [
          records.isDeposit ? 'Now': records.date,
          `$${records.amount * userData.partySize}.00`,
          records.isCash ? cashOnlyIcon() : NonCashIcon()
        ]));
    setTableData(tableData);

    tripData.payments.map(records => {
      if (records.isDeposit) {
        setNonRefundAmount(records.amount * userData.partySize);
        saveState({depositAmount: records.amount});

      }

      const query = {
        date: records.date,
        amount: records.amount * userData.partySize,
        isCash: records.isCash,
        isDeposit: records.isDeposit,
        isFinalPayment: records.isFinalPayment,
        isOther: records.isOther,
        isTip: records.isTip,
        paid: false,
      };
      setUserPaymentSchedule(p => [...p, query]);
    });

    setLoading(false);
  }, []);

  const onNext = () => {
    saveState({
      userPayments: userPaymentSchdeule,
      tripCost: Number(tripData.tripPrice * userData.partySize),
      nonRefundTotal: Number(nonRefundAmount),
    });
    next();
  };

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <HelpButton style={styles.helpButton} />
        </View>
        <View style={[styles.elementsContainer]}>
          <View>
            <Text style={styles.headerStyle}>
              Trip Fee Schedule
            </Text>
            <View style={styles.instructionView}>
              <Text style={styles.instructionText}>Total Price For Your Trip ${tripData.tripPrice * userData.partySize}.00 </Text>
            </View>
            <View style={styles.instructionView}>
              <Text style={styles.instructionText}>Non Refundable ${nonRefundAmount}.00 </Text>
            </View>
            <PaymentTableResponsive rowData={tableData} headers={headers} />
          </View>
          <View style={styles.instructionView}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonText} onPressIn={back}><Text>Back</Text></Pressable>
              <Pressable style={styles.buttonText} onPressIn={cancel}><Text>Cancel</Text></Pressable>
              <Pressable style={styles.buttonText} onPressIn={onNext}><Text>Next</Text></Pressable>
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
export default memo(Step3);
