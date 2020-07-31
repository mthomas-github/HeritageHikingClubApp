import React, {memo} from 'react';
import {Background, Logo, Paragraph} from '../components';
const AdminScreen = ({navigation}) => {
  return (
    <Background>
      <Logo />
      <Paragraph>Admin Screen</Paragraph>
    </Background>
  );
};

export default memo(AdminScreen);
