import React, {memo, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Signature from 'react-native-signature-canvas';
import moment from 'moment';
import {Logo} from '../components';
import {ScrollView} from 'react-native-gesture-handler';

const LiabilityStep = ({...props}) => {
  const [signature, setSignature] = useState(null);
  const {next, cancel, back} = props;
  const [currentDate, setCurrentDate] = useState(null);

  const handleSignature = userSignature => {
    setSignature(userSignature);
    const currentDT = moment(new Date()).format('YYYY-MM-DD');
    setCurrentDate(currentDT);
  };

  const handleEmpty = () => {};

  const style = `
    .m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }
  `;

  return (
    <View style={styles.container}>
      <Logo />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textaCancellation}>
          Liability Release and Assumption of Risk Agreement (including
          waterfall jumps)
        </Text>
        <Text style={{alignSelf: 'center'}}>(Scroll To Read)</Text>
        <Text style={styles.cancelText}>
          I acknowledge that I have voluntarily chosen to participate in this
          hiking/camping trip referenced on the hiking clubs trip application.
          And that I understand that there is no liability insurance provided by
          Bill Furey and in so doing, I acknowledge that I may be subjecting
          myself to dangers and hazards, which could result in illness, injury
          or death. I also acknowledge that there are inherent risks and
          dangers, which may arise at any time during the trip. I am
          specifically familiar with and accept the risks of the dangers and
          hazards referred to in the trip materials, which have been provided to
          me. I am aware that medical services or facilities might not be
          readily available while I am participating in the trip.
        </Text>
        <Text style={styles.cancelText}>
          In consideration of my being permitted to participate in this NON
          COMMERCIAL trip, I agree to assume all risks of illness, injury or
          death and agree not to sue and to release from liability and indemnify
          Heritage Hiking Club, i.e. volunteer leader Bill Furey, or other
          volunteer leaders/persons involved with this non-commercial trip, from
          all actions, claims or demands for injury, loss or damage regardless
          of the cause resulting from my participation in the trip.
        </Text>
        <Text style={styles.cancelText}>
          The terms of this agreement shall serve as a release and assumption of
          risk binding on my heirs, executor, administrator and all members of
          my family, including any minors accompanying me.
        </Text>
        <Text style={styles.cancelText}>
          I have carefully read all Information, I have familiarized myself with
          all information provided to me about this trip, and I agree to all
          stated conditions set forth in the Reservation Information
          specifically including the section outlining my responsibilities and
          obligations as a trip member.
        </Text>
        <Text style={styles.cancelText}>
          I have carefully read this agreement and agree to the “Cancellation
          Policy” above and I understand that it is a Release of Liability and a
          contract between Heritage Club, i.e. volunteer leader Bill Furey and
          me and I sign this agreement of my own free will. If any part of this
          agreement is deemed unenforceable, all other parts shall be given full
          force and effect.
        </Text>
        <Text style={styles.cancelText}>
          *If I am signing on behalf of a minor, in addition to the above, I
          also agree to RELEASE, HOLD HARMLESS AND INDEMNIFY the entities named
          above for any claims of the minor. I agree to be responsible for any
          medical expenses incurred by the minor.
        </Text>
      </ScrollView>
      <View style={[styles.sigView]}>
        <View style={styles.sigItem}>
          <Text>Signature:X</Text>
        </View>
        <View style={styles.sigItem}>
          {signature ? (
            <Image
              source={{uri: signature}}
              resizeMode={'contain'}
              style={styles.signatureImage}
            />
          ) : null}
        </View>
        <View style={styles.sigItem}>
          <Text>Date: {currentDate}</Text>
        </View>
      </View>
      <View style={styles.signatureView}>
        <Signature
          onOK={handleSignature}
          onEmpty={handleEmpty}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={[styles.sendButton]} onPress={back}>
          <Text style={[styles.buttonText]}>{'previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sendButton]} onPress={cancel}>
          <Text style={[styles.buttonText]}>{'cancel'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton]}
          onPress={next}
          disabled={signature ? false : true}>
          <Text style={[styles.buttonText]}>{'next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  signatureImage: {
    width: 150,
    height: 50,
    marginTop: -15,
    marginLeft: -65,
  },
  signatureView: {
    height: 175,
    paddingTop: 5,
    paddingBottom: 32,
  },
  uiView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'yellow',
  },
  sigView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
  },
  item: {
    paddingLeft: 2,
    paddingTop: 2,
    width: '50%', // is 50% of container width
  },
  sigItem: {
    paddingLeft: 2,
    paddingTop: 2,
    width: '33%', // is 50% of container width
  },
  cancelText: {paddingLeft: 5, paddingTop: 5},
  underLineText: {
    textDecorationLine: 'underline',
  },
  fontWeightText: {fontWeight: '600'},
  txtColorRed: {color: 'red'},
  textaCancellation: {
    paddingLeft: 5,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#00b2fe',
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
  },
  sendButton: {
    flexDirection: 'row',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    width: 100,
    height: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  buttonText: {
    color: '#EE82EE',
  },
});

export default memo(LiabilityStep);
