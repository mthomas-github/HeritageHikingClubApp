import React from 'react';
import {goBack, onScreen} from '../constants';
import {
  Step1,
  Step2,
  Step3,
  Step4,
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
    {name: 'Welcome Step', component: Step1},
    {name: 'Confirm Party', component: Step2},
    {name: 'Fee Schedule', component: Step3},
    {name: 'Party Infomation', component: Step4},
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
        Trips: [data],
      },
      {merge: true},
    );
  };

  const cancel = () => {
    goBack(navigation)();
  };

  return (
   <>
      <AnimatedFormView
        steps={allSteps}
        onFinish={finish}
        onBack={onBack}
        onNext={onNext}
        onCancel={cancel}
        trip={route.params}
      />
    </>
  );
};

export default AdventureSignupScreen;
