import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-fontawesome-pro';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  AdminScreen,
  AdventureScreen,
  UserProfileScreen,
  AdventureDetailScreen,
  AdventureInterestedScreen,
  AdventureSignupScreen,
  UserTripPaymentSchdule,
  MakePaymentScreen,
} from './screens';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const userId = auth().currentUser.uid;
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        let result =
          documentSnapshot.data() === undefined
            ? null
            : documentSnapshot.data();

        if (result !== null) {
          if (result.isAdmin || result.isMod || result.isSuper) {
            setShowAdmin(true);
          } else {
            setShowAdmin(false);
          }
        }
        setLoading(false);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);

  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <Tab.Navigator
      initialRouteName="Adventures"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Adventures':
              iconName = 'suitcase';
              break;
            case 'User Profile':
              iconName = 'address-card';
              break;
            case 'Admin':
              iconName = 'user-shield';
              break;
            default:
              iconName = '';
          }
          return <Icon name={iconName} size={35} color={color} />;
        },
        gestureEnabled: false,
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Adventures" component={AdventureScreen} />
      <Tab.Screen name="User Profile" component={UserProfileScreen} />
      {showAdmin && <Tab.Screen name="Admin" component={AdminScreen} />}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={({route, navigation}) => ({
        gestureEnabled: false,
        headerShown: false,
      })}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="Landing" component={AuthLoadingScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigator} />
      <Stack.Screen
        name="AdventureDetailScreen"
        component={AdventureDetailScreen}
      />
      <Stack.Screen
        name="AdventureInterestedScreen"
        component={AdventureInterestedScreen}
      />
      <Stack.Screen
        name="AdventureSignupScreen"
        component={AdventureSignupScreen}
      />
      <Stack.Screen
        name="UserTripPaymentScreen"
        component={UserTripPaymentSchdule}
      />
      <Stack.Screen name="MakePaymentScreen" component={MakePaymentScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
