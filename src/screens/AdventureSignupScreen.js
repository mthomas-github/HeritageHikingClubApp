import React, {useState, useEffect} from 'react';
import {goBack, onScreen} from '../constants';
import {StepContainer} from '../styles/index';
import {
  WelcomeStep,
  ConfirmPartyStep,
  FeeScheduleStep,
  PartyInfomationStep,
  LiabilityStep,
  ResponsibilitiesStep,
  CancellationStep,
  PaymentScreen,
  FinalConfirmationStep,
} from '../steps';
import firestore from '@react-native-firebase/firestore';
import AnimatedFormView from '../components/AnimatedFormView';

const AdventureSignupScreen = ({navigation, route}) => {
  const allSteps = [
    {name: 'Welcome Step', component: WelcomeStep},
    {name: 'Confirm Party', component: ConfirmPartyStep},
    {name: 'Fee Schedule', component: FeeScheduleStep},
    {name: 'Party Infomation', component: PartyInfomationStep},
    {name: 'Responsibilities', component: ResponsibilitiesStep},
    {name: 'Cancelation Step', component: CancellationStep},
    {
      name: 'Liability Release and Assumption of Risk Agreement',
      component: LiabilityStep,
    },
    {name: 'Payment', component: PaymentScreen},
    {name: 'FinalConfirmation', component: FinalConfirmationStep},
  ];

  /* define the method to be called when you go on next step */
  const onNext = () => {};

  /* define the method to be called when you go on back step */
  const onBack = () => {};

  /* define the method to be called when the wizard is finished */
  const finish = finalState => {
    saveMemberTrip(finalState);
    onScreen('UserTripPaymentScreen', navigation, finalState)();
  };

  const saveMemberTrip = data => {
    const updateUser = firestore()
      .collection('Users')
      .doc(data.UserId);

    updateUser.set(
      {
        Trips: data,
      },
      {merge: true},
    );
  };

  const cancel = () => {
    goBack(navigation)();
  };

  return (
    <StepContainer>
      <AnimatedFormView
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
        onCancel={cancel}
        trip={route.params}
      />
    </StepContainer>
  );
};

export default AdventureSignupScreen;
