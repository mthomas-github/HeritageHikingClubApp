import React from 'react';
import { goBack, onScreen } from '../constants';
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
} from '../steps';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AnimatedFormView from '../components/AnimatedFormView';

const AdventureSignupScreen = ({ navigation, route }) => {
  const allSteps = [
    { name: 'Welcome Step', component: Step1 },
    { name: 'Confirm Party', component: Step2 },
    { name: 'Fee Schedule', component: Step3 },
    { name: 'Party Infomation', component: Step4 },
    { name: 'Responsibilities', component: Step5 },
    { name: 'Cancelation Step', component: Step6 },
    { name: 'Payment', component: Step7 },
    { name: 'FinalConfirmation', component: Step8 },
  ];

  /* define the method to be called when you go on next step */
  const onNext = () => { };

  /* define the method to be called when you go on back step */
  const onBack = () => { };

  /* define the method to be called when the wizard is finished */
  const finish = finalState => {
    console.log(finalState);
    saveMemberTrip(finalState);
    onScreen('UserTripPaymentScreen', navigation, finalState)();
  };

  const saveMemberTrip = state => {
    const db = firestore()
      .collection('Users')
      .doc(state.userId);

    db.update({
      trips: firebase.firestore.FieldValue.arrayUnion(state)
    }).catch(err => console.log(err));
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
