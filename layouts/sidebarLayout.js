import {
  Switch,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useSwipe} from '../customHooks/useSwipe';
import {CommonActions} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {setSidebar} from '../reducers/sidebar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import {disconnectSocket} from '../sockets/socketConfig';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {formatDistanceStrict} from 'date-fns';

const rnBiometrics = ReactNativeBiometrics;

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

const sidebarLayout = ({header, subheader}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {sidebar} = useSelector(state => state.sidebar);
  const [photo1, setPhoto1] = useState(require('../images/zaby.png'));
  const [faceId, setFaceId] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [biometryTypeState, setBiometryType] = useState(null);

  const [notificationCount, setNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [company, setCompany] = useState(null);
  var leftValue = React.useRef(new Animated.Value(-PAGE_WIDTH - 24)).current;

  let payload = Math.round(new Date().getTime() / 1000).toString();

  useEffect(() => {
    async function func() {
      const token = await AsyncStorage.getItem('@jwt');
      const id = await AsyncStorage.getItem('@id');
    }
    func();
    return () => {
      // dispatch(setSidebar(false));
    };
  }, []);

  async function logout() {
    disconnectSocket();
    await AsyncStorage.removeItem('@jwt');
  }

  moveLR = () => {
    dispatch(setSidebar(true));
    Animated.timing(leftValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  moveRL = () => {
    dispatch(setSidebar(false));
    Animated.timing(leftValue, {
      toValue: -PAGE_WIDTH,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10000,
      }}>
      <TouchableOpacity style={{padding: 0}} onPress={() => moveLR()}>
        <Image
          style={{padding: 0, alignSelf: 'flex-start', width: 28, height: 20}}
          source={require('../images/hamburger.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
        }}>
        {/* <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            padding: 0,
            alignSelf: 'flex-start',
            width: '100%',
            height: 40,
          }}
          source={require('../images/img_0.png')}
        /> */}

        <Text
          style={{
            fontSize: 33,
            fontWeight: '900',
            color: '#241515',
            textAlign: 'center',
          }}>
          Wappis
        </Text>

        <Text
          style={{
            fontSize: 10,
            fontWeight: '700',
            color: '#3E3E3E',
            opacity: 0.4,
            display: 'flex',
            textAlign: 'center',
          }}>
          Customer Wappsi
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Image
            resizeMode="contain"
            style={{padding: 0, alignSelf: 'flex-start', height: 25, width: 25}}
            source={require('../images/BellIcon.png')}
          />
          <View
            style={{
              backgroundColor: '#fad00e',
              padding: 5,
              width: '100%',
              borderRadius: 100,
              position: 'absolute',
              top: -12,
              right: -10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: 10,
              }}>
              {notificationCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          transform: [{translateX: leftValue}],
          zIndex: 20,
        }}>
        <View
          style={{
            width: PAGE_WIDTH * 0.8,
            height: PAGE_HEIGHT,
            position: 'absolute',
            zIndex: 10000000,
            top: -48,
            left: -24,
            flex: 1,
            zIndex: 10,
            elevation: 1000,
            // padding: 24,
          }}>
          <LinearGradient
            colors={['#131313', '#241515']}
            style={{
              width: PAGE_WIDTH * 0.8,
              height: PAGE_HEIGHT + 48,
              position: 'absolute',
              top: -48,
              left: 0,
            }}
            start={{x: 1.0, y: 0}}
            end={{x: 0, y: 1}}
          />

          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                // alignItems: 'center',
                paddingTop: 68,
                zIndex: 9999999999999999999,
                position: 'relative',
                padding: 24,
                paddingBottom: 30,
              }}>
              <TouchableOpacity
                onPress={() => moveRL()}
                style={{position: 'absolute', right: 24, top: 75}}>
                <Image source={require('../images/x.png')} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text
                  style={{
                    fontSize: 33,
                    fontWeight: '900',
                    color: '#fad00e',
                  }}>
                  Wappis
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: '#FFFFFF',

                  display: 'flex',
                }}>
                Customer Wappsi
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    color: '#fff',
                    // paddingTop: 10,
                  }}>
                  The
                </Text>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    color: '#fad00e',
                    paddingLeft: 6,
                  }}>
                  #1
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 24,
                  color: '#fff',
                  paddingTop: 5,
                }}>
                Expense Record
              </Text>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 24,
                  color: '#fff',
                  paddingTop: 5,
                }}>
                Keeping App
              </Text>
            </View>
            <View style={{backgroundColor: '#fad00e'}}>
              <View style={{paddingHorizontal: 30, paddingVertical: 13}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: '400', fontSize: 15, color: '#fff'}}>
                    Company:
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: '#fff',
                      paddingLeft: 2,
                    }}>
                    {company?.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: '400', fontSize: 15, color: '#fff'}}>
                    New Customers this month:
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: '#fff',
                      paddingLeft: 2,
                    }}>
                    78
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: '400', fontSize: 15, color: '#fff'}}>
                    Repeat Customers This Month:
                  </Text>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: '#fff',
                      paddingLeft: 2,
                    }}>
                    31
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                paddingTop: 30,
                paddingLeft: 24,
                paddingRight: 24,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#9CA4AB',
                }}>
                Quick Menu
              </Text>

              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('CostCalculator');
                  // moveRL();
                }}>
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('../images/Calculator.png')}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    Payment Solutions{' '}
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#FFF',
                      }}>
                      : Coming Soon!
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CostCalculator');
                  moveRL();
                }}>
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={require('../images/Calculator.png')}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    Cost Calculator
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddCompany');
                  moveRL();
                }}>
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{ height: 24, width: 24 }}
                    source={require('../images/briefcase.png')}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      paddingLeft: 16,
                      color: '#FFF',
                    }}>
                    New Business Setup
                  </Text>
                </View>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                paddingTop: 29,
                paddingLeft: 24,
                paddingRight: 24,
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  color: '#9CA4AB',
                }}>
                Security
              </Text>
              {biometryTypeState === 'FaceID' && (
                <View
                  style={{
                    paddingTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 10000,
                    display: Platform.select({ios: 'flex', android: 'none'}),
                  }}>
                  <Pressable
                    // style={{flex: 1}}
                    onPress={() => {
                      useFaceId();
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../images/FaceId.png')}
                      />
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 14,
                          paddingLeft: 16,
                          color: '#FFF',
                        }}>
                        Face ID
                      </Text>
                    </View>
                  </Pressable>
                  <Switch
                    trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                    thumbColor={faceId ? '#fad00e' : '#ffffff'}
                    value={faceId}
                    onValueChange={() => {
                      useFaceId();
                    }}
                  />
                </View>
              )}
              {(biometryTypeState === 'TouchID' ||
                biometryTypeState === 'Biometrics') && (
                <View
                  style={{
                    paddingTop: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable
                    // style={{flex: 1}}
                    onPress={() => {
                      useFingerprint();
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{height: 24, width: 24}}
                        source={require('../images/FingerprintScan.png')}
                      />

                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 14,
                          paddingLeft: 16,
                          color: '#FFF',
                        }}>
                        Fingerprint Scan
                      </Text>
                    </View>
                  </Pressable>
                  <Switch
                    style={
                      {
                        // flex: 1,
                        // width: '100%',
                        // heigh: 50,
                      }
                    }
                    trackColor={{true: '#F2F2F5', false: '#F2F2F5'}}
                    thumbColor={fingerprint ? '#fad00e' : '#ffffff'}
                    value={fingerprint}
                    onValueChange={() => {
                      useFingerprint();
                    }}
                  />
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  moveRL();
                  navigation.navigate('UpdatePassword');
                }}>
                <View
                  style={{
                    paddingTop: 24,
                    flexDirection: 'row',

                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: 24, width: 24}}
                      source={require('../images/Lock.png')}
                    />
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        paddingLeft: 16,
                        color: '#FFF',
                      }}>
                      Change Password
                    </Text>
                  </View>
                  <Image source={require('../images/ArrowIcon.png')} />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'flex-end',
                flex: 1,
                paddingTop: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
                }}>
                <Text
                  style={{fontWeight: '500', fontSize: 16, color: '#fad00e'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
};

export default sidebarLayout;

const styles = StyleSheet.create({});
