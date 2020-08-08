import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import {
  AppBackGroundColor,
  AppHeaderTextColor,
  AppTextColor,
  AppActionButtonColor
} from '../AppSettings';
import { HelpButton, PartyInfoRow } from '../components';

const Step4 = ({ ...props }) => {
  const { back, next, cancel, saveState, getState } = props;
  const n = getState().partySize;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [partyMemberInfo, setPartyMemberInfo] = useState([]);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onChangeName = text => {
    setName(text);
  };

  const onChangeEmail = text => {
    setEmail(text);
  };

  const onNext = () => {
    saveState({ partyInfo: partyMemberInfo });
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
    <View style={styles.container}>
      <View style={styles.headerView}>
        <HelpButton style={styles.helpButton} />
      </View>
      <View style={[styles.elementsContainer]}>
        <View>
          <Text style={styles.headerStyle}>
            Party Info
            </Text>
        </View>
        <View>
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
export default memo(Step4);
