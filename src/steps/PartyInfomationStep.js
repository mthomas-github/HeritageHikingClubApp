import React, {memo, useState} from 'react';
import {Header, PartyInfoRow, Background} from '../components';
import {
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');

const PartyInfomationStep = ({...props}) => {
  const {back, next, cancel, saveState, getState} = props;
  const n = getState().partySize; // Or something else
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [partyMemberInfo, setPartyMemberInfo] = useState([]);

  const onChangeName = text => {
    setName(text);
  };

  const onChangeEmail = text => {
    setEmail(text);
  };

  const onNext = () => {
    saveState({PartyInfo: partyMemberInfo});
    next();
  };

  const onInputNameBlur = value => {
    if (value.nativeEvent.text) {
    }
  };

  const onInputEmailBlur = value => {
    if (value.nativeEvent.text) {
      let query = {
        name: name,
        email: email,
      };
      setPartyMemberInfo([...partyMemberInfo, query]);
    }
  };

  return (
    <Background>
      <Header>Party Infomation</Header>
      <ScrollView style={styles.scollViewContainer}>
        {[...Array(n)].map((e, i) => (
          <PartyInfoRow
            key={i}
            member={i++ + 1}
            onChangeEmail={onChangeEmail}
            onChangeName={onChangeName}
            blurName={onInputNameBlur}
            blurEmail={onInputEmailBlur}
          />
        ))}

        <View style={[styles.buttonContainer, {width: width}]}>
          <TouchableHighlight style={[styles.sendButton]} onPress={back}>
            <Text style={[styles.buttonText]}>{'previous'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.sendButton]} onPress={cancel}>
            <Text style={[styles.buttonText]}>{'cancel'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.sendButton]}
            onPress={onNext}
            disabled={partyMemberInfo.length <= 0}>
            <Text style={[styles.buttonText]}>{'next'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  scollViewContainer: {
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
  },
  sendButton: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    width: 95,
    height: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EE82EE',
  },
});
export default memo(PartyInfomationStep);
