import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './utils/theme';
import AppNavigator from './AppNavigator';
import {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {StatusBar} from 'react-native';
configureFontAwesomePro();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
