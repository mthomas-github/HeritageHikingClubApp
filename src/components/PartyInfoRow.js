import React, {memo} from 'react';
import { View, TextInput, Header} from 'react-native';

const PartyInfoRow = ({...props}) => {
  const {
    member,
    inputName,
    inputEmail,
    onChangeName,
    onChangeEmail,
    blurName,
    blurEmail,
  } = props;

  return (
    <View style={{marginTop: -15}}>
      <Header style={{color: 'white'}}>Member {member}</Header>
      <TextInput
        label="Full Name"
        returnKeyType="next"
        value={inputName}
        onChangeText={onChangeName}
        key={props.key}
        onBlur={blurName}
      />
      <TextInput
        label="Email"
        returnKeyType="done"
        onChangeText={onChangeEmail}
        autoCapitalize="none"
        value={inputEmail}
        keyboardType="email-address"
        key={props.key * 2}
        onBlur={blurEmail}
      />
    </View>
  );
};

export default memo(PartyInfoRow);
