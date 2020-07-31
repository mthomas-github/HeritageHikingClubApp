import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-fontawesome-pro';

const PaymentRow = ({...props}) => {
  return (
    <>
      <View style={styles.item} key={props.key}>
        <Text style={[styles.textFee]} key={props.key}>
          {props.deposit ? 'Now' : props.paymentDate}
        </Text>
      </View>
      <View style={styles.item} key={props.key}>
        <Text style={[styles.textFee, styles.textFeeAmount]} key={props.key}>
          ${Number(props.amount)}.00
        </Text>
      </View>
      <View style={styles.item} key={props.key}>
        {props.cashOnly ? (
          <Icon
            name="check"
            size={20}
            color="green"
            containerStyle={styles.icon}
          />
        ) : (
          <Icon
            name="times"
            size={20}
            color="red"
            containerStyle={styles.icon}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  icon: {
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default memo(PaymentRow);
