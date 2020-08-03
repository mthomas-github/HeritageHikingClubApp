import React, {memo, useEffect, useState} from 'react';
import {Logo, Header} from '../components';
import {Text, View, TouchableHighlight, ActivityIndicator} from 'react-native';
import {Container, styles} from '../styles';
import { getPaymentTypeTextInstuction} from '../constants';

const FinalConfirmationStep = ({...props}) => {
  const {next, getState} = props;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const data = getState();
    setUserData(data);
    setLoading(false);
  }, [getState]);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <Container>
      <Logo />
      <Header>Heritage Hiking Club</Header>
      <View style={styles.container}>
        <Text style={styles.slogan}>We want to hike AMERICA.!</Text>
        <View style={styles.descriptionContent}>
          <Text style={styles.description}>
            Congratulations on completiing the sign up process, now you have
            {' 96 Hrs '}to make sure that you send your payment of $
            {userData.AmountDue}.00 via{' '}
              {getPaymentTypeTextInstuction(userData.PaymentType)}. If you fail to submit
            payment you will loose your seat. You will receive an email with
            your payment schdule if you've choosen to pay by payments. You will
            also recieve a trip packet.
          </Text>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={next}>
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableHighlight>
      </View>
    </Container>
  );
};

export default memo(FinalConfirmationStep);
