import React, { memo, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { BackButton, HelpButton, PaymentTableResponsive } from '../components';
//import {PaymentTableResponsive} from '../components/PaymentTableResponsive';
import { goBack } from '../constants';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor,
  AppPaymentOwnerName
} from '../AppSettings';
const { width } = Dimensions.get('window');
const headers = [
  "Date",
  "Amount",
  "Paid",
]
const UserTripPaymentSchedule = ({ navigation, route, ...props }) => {
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
            <PaymentTableResponsive data={userTripInfo.Payments} headers={headers}/>
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
    flex: 1,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
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
});

export default memo(UserTripPaymentSchedule);
