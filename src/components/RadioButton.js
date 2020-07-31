import React, {memo, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');

const RadioButton = ({...props}) => {
  const {options, onClick, value} = props;

  return (
    <View>
      {options.map(item => {
        return (
          <View key={item.key} style={[styles.container, {width: width}]}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => onClick(item.key)}>
              {value === item.key && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <View style={styles.item}>
              <Text>{item.text}</Text>
            </View>
            <View style={styles.item}>
              <Text>{item.instruction}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  item: {
    paddingLeft: 5,
    width: '36%',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'black',
  },
});

export default memo(RadioButton);
