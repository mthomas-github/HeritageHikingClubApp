import React, {memo} from 'react';
import {Logo, Header} from '../components';
import {Text, View, TouchableHighlight} from 'react-native';
import {Container, styles} from '../styles';

const WelcomeStep = ({...props}) => {
  const {next, cancel} = props;

  return (
    <Container>
      <Logo />
      <Header>Heritage Hiking Club</Header>
      <View style={styles.container}>
        <Text style={styles.slogan}>We want to hike AMERICA.!</Text>
        <View style={styles.descriptionContent}>
          <Text style={styles.description}>
            Congratulations on signing up for HHC Adventure! Over the next
            couple of steps you will confirm a few details, add everyones name
            and email who is in your party. After confirming party info you will
            be required to sign 2 documents. Then Finally you will need to
            choose how you're going to pay for your adventure. You will have x
            minutes to complete the sign up process your seats will be forfited.
            So if you're ready please click start.
          </Text>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={next}>
          <Text style={styles.buttonText}>start</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={cancel}>
          <Text style={styles.buttonText}>cancel</Text>
        </TouchableHighlight>
      </View>
    </Container>
  );
};

export default memo(WelcomeStep);
