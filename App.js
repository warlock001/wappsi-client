import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import {firebase} from '@react-native-firebase/analytics';
// ...
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreenModal from './components/splashScreen';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './pages/onBoarding';
import SignIn from './pages/signIn';
import Register from './pages/register';
import OtpScreen from './pages/otpScreen';
import UpdateEmail from './pages/updateEmail';
import UpdatePhone from './pages/updatePhone';
import UpdatePassword from './pages/updatePassword';
import AddCompany from './pages/addCompany';
import NotificationScreen from './pages/notifications';
import Home from './pages/home';
import MyAccount from './pages/myAccount';
import Contact from './pages/contact';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setPromotions } from './reducers/promotions';
import MyTabBar from './components/tabBar';

import NewOrder from './pages/newOrder';
import ServiceRequest from './pages/serviceRequest';
import CostCalculator from './pages/costCalculator';
import SpecialOffers from './pages/specialOffers';
import BusinessSupportServices from './pages/businessSupportServices';
import BookAnAppointment from './pages/bookAnAppointment';
import BankingPartners from './pages/bankingPartners';
import ForgotEmail from './pages/forgotEmail';
import Refer from './pages/refer';
import { connectToSocket, socket } from './sockets/socketConfig';
import { Notifications } from 'react-native-notifications';
import { useDispatch } from 'react-redux';
import { REACT_APP_BASE_URL } from '@env';
import axios from 'axios';

import ReachPartner from './pages/reachPartner';
import ForgotPassword from './pages/forgotPassword';
import BankAccountOpening from './pages/businessSupportPages/bankSupportService';
import AccountingServices from './pages/businessSupportPages/accountingServices';
import VATServices from './pages/businessSupportPages/VATServices';
import HealthInsurance from './pages/businessSupportPages/healthInsurance';
import MandatoryCompliance from './pages/businessSupportPages/mandatoryComplianceService';
import MailManagement from './pages/businessSupportPages/mailManagement';
import VirtualReceptionist from './pages/businessSupportPages/virtualReceptionist';
import ITServices from './pages/businessSupportPages/ITServices';
import LegalServices from './pages/businessSupportPages/legalServices';
import ProServices from './pages/businessSupportPages/proServices';
import TouristVisa from './pages/businessSupportPages/touristVisa';
import GoldenVisa from './pages/businessSupportPages/goldenVisa';
import SecondCitizenship from './pages/businessSupportPages/secondCitizenship';
import CustomerWappsi from './pages/customerWappsi';
import CreateOffer from './pages/createOffer';
import ManageServices from './pages/manageServices';
import ExpenseTracker from './pages/expenseTracker';
import Analytics from './pages/analytics';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [loggedIn, setLoggedIn] = useState(false);
  const [appInit, setAppInit] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered(event => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error(event);
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log('Notification Received - Foreground', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification.payload);
        console.log(
          `Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`,
        );
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      },
    );

    Notifications.getInitialNotification()
      .then(notification => {
        console.log(
          'Initial notification was:',
          notification ? notification.payload : 'N/A',
        );
      })
      .catch(err => console.error('getInitialNotifiation() failed', err));

    func = async () => {
      const jwt = await AsyncStorage.getItem('@jwt');
      if (jwt !== null) {
        setLoggedIn(true);

        // const defaultAppAnalytics = firebase.analytics();
        // await defaultAppAnalytics.setAnalyticsCollectionEnabled(true);
        // defaultAppAnalytics.logAppOpen();

        images = [
          {
            image: `https://www.armymwr.com/application/files/7816/0130/4930/DG_banner_examples_WebPromo_Community.jpg`,
            link: `https://www.armymwr.com/application/files/7816/0130/4930/DG_banner_examples_WebPromo_Community.jpg`,
          },
        ];
        dispatch(setPromotions(images));
        setAppInit(true);
      } else {
        setLoggedIn(false);
        console.log('asdasd');
        setAppInit(true);
        // SplashScreen.hide();
      }
    };
    func();
  }, []);

  function HomeStack({ route, navigation }) {
    const { shouldRedirect } = route.params;
    useEffect(() => {
      console.log(shouldRedirect);
      shouldRedirect === true
        ? navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'OnBoarding1' }],
          }),
        )
        : '';
    }, [shouldRedirect]);

    useFocusEffect(
      React.useCallback(() => {
        if (!socket.connected && !shouldRedirect) {
          connectToSocket();

          console.log(socket);
        }
      }),
    );
    return (
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          headerShown: false,
        })}>
        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/home2.png')
                      : require('./images/homegrey.png')
                  }
                  style={{ width: 20, height: 20 }}
                />
              );
            },
            tabBarShowLabel: true,
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./images/envelope.png')
                      : require('./images/envelopegrey.png')
                  }
                  style={{ width: 20, height: 20 }}
                />
              );
            },
            // tabBarShowLabel: false,
          }}
          name="Contact"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: focused => {
              return (
                <Image
                  resizeMode={'contain'}
                  style={{ width: 20, height: 20 }}
                  source={
                    focused
                      ? require('./images/account.png')
                      : require('./images/accountGrey.png')
                  }
                />
              );
            },
            // tabBarShowLabel: false,
          }}
          name="Profile"
          component={MyAccount}
          disab
        />
      </Tab.Navigator>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SplashScreenModal isAppInitialized={appInit} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="HomeStack"
              component={HomeStack}
              initialParams={{ shouldRedirect: !loggedIn }}
            />
            <Stack.Screen name="OnBoarding1" component={OnBoarding} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="NewOrder" component={NewOrder} />
            <Stack.Screen name="CustomerWappsi" component={CustomerWappsi} />
            <Stack.Screen name="ServiceRequest" component={ServiceRequest} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="CreateOffer" component={CreateOffer} />
            <Stack.Screen name="ManageServices" component={ManageServices} />
            <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MyAccount" component={MyAccount} />
            {/* <Stack.Screen name="AddCompany" component={AddCompany} />
            <Stack.Screen name="UpdatePhone" component={UpdatePhone} />
            
            <Stack.Screen name="UpdateEmail" component={UpdateEmail} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="CostCalculator" component={CostCalculator} />
            
            <Stack.Screen name="SpecialOffers" component={SpecialOffers} />
            <Stack.Screen name="BankingPartners" component={BankingPartners} />
          
            
            <Stack.Screen name="ReachPartners" component={ReachPartner} />
            <Stack.Screen name="Refer" component={Refer} />
            <Stack.Screen name="ForgotEmail" component={ForgotEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="BankAccountOpening"
              component={BankAccountOpening}
            />
            <Stack.Screen
              name="AccountingServices"
              component={AccountingServices}
            />
            <Stack.Screen name="VATServices" component={VATServices} />
            <Stack.Screen name="LegalServices" component={LegalServices} />
            <Stack.Screen name="HealthInsurance" component={HealthInsurance} />
            <Stack.Screen name="MailManagement" component={MailManagement} />
            <Stack.Screen name="ITServices" component={ITServices} />
            <Stack.Screen name="ProServices" component={ProServices} />
            <Stack.Screen name="TouristVisa" component={TouristVisa} />
            <Stack.Screen name="GoldenVisa" component={GoldenVisa} />
            <Stack.Screen
              name="SecondCitizenship"
              component={SecondCitizenship}
            />
            <Stack.Screen
              name="VirtualReceptionist"
              component={VirtualReceptionist}
            />
            <Stack.Screen
              name="MandatoryCompliance"
              component={MandatoryCompliance}
            />
            <Stack.Screen
              name="BookAnAppointment"
              component={BookAnAppointment}
            />
            <Stack.Screen
              name="BusinessSupportServices"
              component={BusinessSupportServices}
            /> */}
          </Stack.Navigator>
          {/* </SafeAreaView> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default App;
