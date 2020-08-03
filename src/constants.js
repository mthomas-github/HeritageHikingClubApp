import {Dimensions} from 'react-native';

export const win = Dimensions.get('window');
export const W = win.width;
export const H = win.height;

export const hhcId = '1444837668871084';

export const Device = {
  select(variants) {
    if (W >= 300 && W <= 314) {
      return variants.mobile300 || {};
    }
    if (W >= 315 && W <= 341) {
      return variants.iphone5 || {};
    }
    if (W >= 342 && W <= 359) {
      return variants.mobile342 || {};
    }
    if (W >= 360 && W <= 374) {
      return variants.mi5 || {};
    }
    if (W >= 375 && W <= 399) {
      return variants.iphone678 || {};
    }
    if (W >= 400 && W <= 409) {
      return variants.mobile400 || {};
    }
    if (W >= 410 && W <= 414) {
      return variants.googlePixel || {};
    }
    if (W >= 415 && W <= 434) {
      return variants.mobile415 || {};
    }
    if (W >= 435 && W <= 480) {
      return variants.redmiNote5 || {};
    }
  },
};

export const iPhoneSize = () => {
  const windowWidth = Dimensions.get('window').width;
  if (windowWidth === 320) {
    return 'small';
  }
  if (windowWidth === 414) {
    return 'large';
  }
  return 'medium';
};

export const goBack = navigation => () => navigation.goBack();

export const onScreen = (screen, navigation, obj) => () => {
  navigation.navigate(screen, obj);
};

export const goHome = navigation => () => navigation.popToTop()();

export const colors = {
  black: '#000000',
  lightBlack: '#484848',
  white: '#ffffff',
  white01: '#EEEEEE',
  green01: '#008388',
  green02: '#02656b',
  darkOrange: '#d93900',
  lightGray: '#d8d8d8',
  darkGray: '#474747',
  darkGray01: '#888',
  darkGray02: '#808080',
  pink: '#fc4c54',
  gray01: '#f3f3f3',
  gray02: '#919191',
  gray03: '#b3b3b3',
  gray04: '#484848',
  gray05: '#dadada',
  gray06: '#ebebeb',
  gray07: '#f2f2f2',
  gray08: '#E6E6FA',
  gray09: '#CED0CE',
  gray10: '#E6E6E6',
  brown01: '#ad8763',
  brown02: '#7d4918',
  blue: '#4995cd',
};

export const getPaymentTypeTextInstuction = paymentType => {
  switch (paymentType) {
    case 1:
      return 'Venmo. Send to @william-furey-2';
    case 2:
      return 'Zelle. Send to b_furey@yahoo.com';
    case 3:
      return 'Check. Payable to Bill Furey';
    case 4:
      return 'Cash. Envelope with name on it';
    default:
      return 'Cash. Envelope with name on it';
  }
};

export const getPaymentTypeText = paymentType => {
  switch (paymentType) {
    case 1:
      return 'Venmo';
    case 2:
      return 'Zelle';
    case 3:
      return 'Check';
    case 4:
      return 'Cash';
    default:
      return 'Cash';
  }
}

export const randomFixedInteger = (length) => {
  let userCode = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
  return userCode;
}
