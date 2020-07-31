import React, {memo} from 'react';
import {Logo} from '../components';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import {Container} from '../styles';

const ResponsibilitiesStep = ({...props}) => {
  const {next, cancel, back} = props;

  return (
    <Container>
      <Logo />
      <Text style={styles.title}>
        Responsibilities as a HHC adventure member
      </Text>
      <Text style={styles.smallText}>
        ALL MEMBERS must attend required FINAL infomation meeting and at least{' '}
        {'SOME NUMBER OF HIKES'} pre-hikes, including last 3 to 5 pre-hikes in
        order to attend.
      </Text>
      <Text>(Scroll To Read)</Text>
      <ScrollView style={styles.scrollContainer}>
        <Unorderedlist>
          <Text>
            Medical considerations: If you have any medical or physical
            conditions, please discuss them with Mr. Furey. Leadership has the
            right to disqualify anyone at any time during the pre-trip hikes, if
            he feels the trip member is mentally or physically incapable to
            continue and/or if a trip member's continued participation
            jeopardizes the groups or his/her own safety. Under these
            circumstances a refund may be given. Leadership has the right to
            disqualify anyone at any time during the trip, if he feels the trip
            member is mentally (behavior problem) or physically incapable to
            continue and/or if a trip member's continued participation
            jeopardizes the groups or his/her own safety. Under these
            circumstances a refund will not be given, and the trip member will
            be sent home at the trip member’s expense. HHC assumes no liability
            regarding provision of medical care. By signing the Liability
            Release and Assumption of Risk Agreement, you agree to pay for
            emergency evacuation and emergency medical care if needed.
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text>
            Lunches - You are solely responsible for your lunches on week of
            trip. So pack hearty lunches.
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text>
            By participating in a HHC trip, you assume certain obligations to
            HHC and the other trip members. It is your responsibility to know:
          </Text>
          <Unorderedlist>
            <Text>
              You will be required to haul your personal gear (duffels) to your
              campsite from motorcoach drop-off on Sunday and place back on
              Wednesday (departure) morning.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              You will be part of the cook-team for one group meal from meal
              prep to dishes.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              You are responsible to set up your own tent. Please set it up at
              home before trip.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              You are responsible to wash your dishes at mealtimes. We provide
              hot soapy water.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Understand the conditions implied in the Heritage Club trip trail
              grading system.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Prepare for the trip by familiarizing yourself with the trip
              itinerary and trip preparation materials sent by Mr. Bill Furey.
              Attend as many pre-trip hikes- and final meeting. Bring
              appropriate gear and clothing as advised by leadership team.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              This is a group adventure, no solo hikes/hikers. We start and
              finish trip together.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Follow considerate social behavior with other trip participants.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Complete the trip itinerary as scheduled (or as adjusted by
              leadership as necessary).
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Respect the natural environment by using environmentally safe
              products, staying on established trails of travel and not
              littering.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Anyone who is promoting trips other than Heritage Hiking Club
              Trips will be asked to leave trip immediately.
            </Text>
          </Unorderedlist>
          <Unorderedlist>
            <Text>
              Heritage Hiking Club reserves the right to decline to accept or
              retain any person(s) as a trip participant(s) should such person's
              behavior, health, hiking ability or mental condition impede the
              operation of the trip.
            </Text>
          </Unorderedlist>
        </Unorderedlist>
        <Text style={styles.legal}>
          OUR LEGAL LIMITATIONS-PLEASE READ CAREFULLY
        </Text>
        <Text style={styles.legalsub}>
          Heritage volunteer Hiking Club may contract with independent
          contractors to provide transportation. We assume no responsibility,
          however caused, for injury, loss or damage to person or property in
          connection with any service provided by an independent contractor or
          resulting directly from the following: - acts of God - detention
          annoyance - terrorism - thefts – vehicle accidents-government
          restrictions or regulations - strikes - failure of any means of
          conveyance to arrive or depart as scheduled - discrepancies or change
          in transit over which we have no control.
        </Text>
      </ScrollView>
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={back}>
          <Text style={styles.buttonText}>previous</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={cancel}>
          <Text style={styles.buttonText}>cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.sendButton]}
          onPress={next}>
          <Text style={styles.buttonText}>next</Text>
        </TouchableHighlight>
      </View>
    </Container>
  );
};

export const styles = StyleSheet.create({
  legal: {
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  legalsub: {
    fontSize: 12,
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    textDecorationLine: 'underline',
  },
  smallText: {
    color: 'red',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 14,
    paddingLeft: 10,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slogan: {
    fontSize: 18,
    fontWeight: '600',
    color: '#228B22',
    marginTop: 10,
  },
  descriptionContent: {
    padding: 30,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: '#FFFFFF',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    marginLeft: 12,
  },
  sendButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#EE82EE',
  },
});

export default memo(ResponsibilitiesStep);
