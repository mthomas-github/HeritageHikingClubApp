/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 100px;
  alignSelf: center;
  alignItems: center;
  backgroundColor: #14C0CC;
`;

export const StepContainer = styled.View`
  flex: 1;
  width: 100%;
  alignSelf: center;
  alignItems: center;
  backgroundColor: #14C0CC;
`;

export const Step2Container = styled.View`
  flex: 1;    
  padding-top: 50px;
  backgroundColor: #14C0CC;
`;


export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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
