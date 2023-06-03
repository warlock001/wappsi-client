import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native-paper';
import TextField from '../components/inputField';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '@env';
import { setPromotions } from '../reducers/promotions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { setSidebar } from '../reducers/sidebar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingModal from '../components/loadingScreen';

const rnBiometrics = ReactNativeBiometrics;

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState(false);
  let payload = Math.round(new Date().getTime() / 1000).toString();
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [biometryTypeState, setBiometryType] = useState(null);
  getMyStringValue = async () => {
    try {
      const { biometryType } = await rnBiometrics.isSensorAvailable();
      console.log('biometry type =' + biometryType);
      setBiometryType(biometryType);
      const jwt = await AsyncStorage.getItem('@jwt');
      navigate(jwt);
    } catch (e) {
      console.log(e);
    }
  };
  function navigate(jwt) {
    if (jwt !== null) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'HomeStack' }],
        }),
      );
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getMyStringValue();
    }, []),
  );
  // function verifySignatureWithServer(signature, payload, id) {
  //   setLoader(true);
  //   console.log(id);
  //   axios({
  //     method: 'POST',
  //     url: `${REACT_APP_BASE_URL}/verifyBiometric?id=${id}`,
  //     data: {
  //       signature,
  //       payload,
  //     },
  //   })
  //     .then(async res => {
  //       console.log(res.data.token);
  //       await AsyncStorage.setItem('@id', res.data._id);
  //       await AsyncStorage.setItem('@jwt', res.data.token);
  //       await AsyncStorage.setItem('@demo', `${!res.data.isVerified}`);
  //       const token = res.data.token;

  //       console.log('verified = ' + token);
  //       axios({
  //         method: 'GET',
  //         url: `${REACT_APP_BASE_URL}/allPromotions`,
  //         // headers: {
  //         //   'x-auth-token': token,
  //         // },
  //       })
  //         .then(async resp => {
  //           var images = [];

  //           for (const promo of resp.data.allPromos) {
  //             console.log(promo);
  //             const file = await axios({
  //               method: 'GET',
  //               url: `${REACT_APP_BASE_URL}/files/${promo.image}/true`,
  //               headers: {
  //                 'x-auth-token': res.data.token,
  //               },
  //             }).catch(err => console.log('promo = ' + err));
  //             images.push({
  //               image: `data:${file.headers['content-type']};base64,${file.data}`,
  //               link: promo.link,
  //             });
  //           }
  //           console.log('hello');
  //           dispatch(setPromotions(images));
  //           dispatch(setSidebar(false));
  //           setLoader(false);

  //           navigation.dispatch(
  //             CommonActions.reset({
  //               index: 1,
  //               routes: [{name: 'HomeStack', params: {shouldRedirect: false}}],
  //             }),
  //           );
  //         })
  //         .catch(err => {
  //           console.log('promi err : ' + err);
  //           setLoader(false);
  //         });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setLoader(false);
  //     });
  // }

  // async function useFaceId() {
  //   const id = await AsyncStorage.getItem('@id');
  //   rnBiometrics.biometricKeysExist().then(resultObject => {
  //     const {keysExist} = resultObject;

  //     if (keysExist) {
  //       rnBiometrics
  //         .createSignature({
  //           promptMessage: 'Sign in',
  //           payload: payload,
  //         })
  //         .then(resultObject => {
  //           const {success, signature} = resultObject;

  //           console.log(signature);
  //           if (success) {
  //             console.log(payload);
  //             verifySignatureWithServer(signature, payload, id);
  //           }
  //         });
  //     }
  //   });
  // }
  // async function useFingerprint() {
  //   const id = await AsyncStorage.getItem('@id');
  //   rnBiometrics.biometricKeysExist().then(resultObject => {
  //     const {keysExist} = resultObject;

  //     if (keysExist) {
  //       rnBiometrics
  //         .createSignature({
  //           promptMessage: 'Sign in',
  //           payload: payload,
  //         })
  //         .then(resultObject => {
  //           const {success, signature} = resultObject;

  //           console.log(signature);
  //           if (success) {
  //             console.log(payload);
  //             verifySignatureWithServer(signature, payload, id);
  //           }
  //         });
  //     }
  //   });
  // }

  function signIn() {
    setLoader(true);
    console.log(REACT_APP_BASE_URL);

    axios({
      timeout: 20000,
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        await AsyncStorage.setItem('@id', res.data._id);
        await AsyncStorage.setItem('@jwt', res.data.token);
        await AsyncStorage.setItem('@demo', `${!res.data.isVerified}`);
        await AsyncStorage.setItem('@company', res.data.company);
        console.log('verified = ' + res.data.isVerified);
        images = [
          {
            image: `https://www.armymwr.com/application/files/7816/0130/4930/DG_banner_examples_WebPromo_Community.jpg`,
            link: `https://www.armymwr.com/application/files/7816/0130/4930/DG_banner_examples_WebPromo_Community.jpg`,
          },
        ];
        dispatch(setPromotions(images));
        dispatch(setSidebar(false));
        setLoader(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'HomeStack', params: { shouldRedirect: false } }],
          }),
        );
      })
      .catch(err => {
        setLoader(false);
        if (err.response) {
          if (err.response.status == 403) {
            setStatus('No User Found');
          } else if (err.response.status == 400) {
            setStatus('Invalid Credentails');
          }
        } else if (err.request) {
          setStatus('Network Error');
        }
      });
  }

  return (
    <View style={{ height: '100%' }}>
      {!loader ? (
        <View style={{ height: '100%' }}>
          <ImageBackground
            source={require('../images/SignIn.jpg')}
            style={{ width: '100%', height: 250 }}>
            <View style={styles.topheader}>
              <View style={styles.textView}>
                <Text style={styles.textStyle}>Sign In</Text>
                <Text style={[styles.textStyle, { paddingBottom: 20 }]}>
                  To Your Account
                </Text>
                {/* <Text style={styles.textStyle2}>
                  Sign with username or email and password to use your account.
                </Text> */}
              </View>
            </View>
          </ImageBackground>
          <KeyboardAwareScrollView style={styles.bottomSection}>
            <View style={{ height: '100%', padding: 24 }}>
              <View style={{ paddingBottom: 20 }}>
                <TextField
                  style={{ marginBottom: 5 }}
                  label="Email Address"
                  onChangeText={text => setEmail(text)}
                  value={email}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  blurOnSubmit={false}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Image
                          resizeMode="contain"
                          style={{ width: 25 }}
                          source={require('../images/EnvelopeClosed.png')}
                        />
                      )}
                    />
                  }
                />
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => navigation.navigate('ForgotEmail')}>
                  <Text style={styles.forgotButtonStyle}>Forgot Email ID?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingBottom: 20 }}>
                <TextField
                  style={{ marginBottom: 5 }}
                  label="Password"
                  secureTextEntry={showPassword ? false : true}
                  innerRef={passwordRef}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Image
                          resizeMode="contain"
                          style={{ width: 25 }}
                          source={require('../images/password_icon.png')}
                        />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                      name={() =>
                        showPassword ? (
                          <Image
                            resizeMode="contain"
                            style={{ width: 25 }}
                            source={require('../images/eyeOpen.png')}
                          />
                        ) : (
                          <Image
                            resizeMode="contain"
                            style={{ width: 25 }}
                            source={require('../images/Hide.png')}
                          />
                        )
                      }
                    />
                  }
                />
                <Text>{status}</Text>
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotButtonStyle}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => {
                  if (email !== null && password !== null) {
                    signIn();
                  }
                }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 20, color: '#FFF' }}>
                  Sign In
                </Text>
              </TouchableOpacity>
              <View style={{ width: '100%', height: 50 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: '500', paddingRight: 5 }}>
                    Don’t have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#fad00e',
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {(biometryTypeState === 'TouchID' ||
                  biometryTypeState === 'Biometrics') && (
                    <TouchableOpacity
                      onPress={() => {
                        useFingerprint();
                      }}
                      style={{
                        flex: 2,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flex: 2,
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../images/FingerprintScan.png')}
                        />
                        <Text style={{ width: 100, textAlign: 'center' }}>
                          Log in with Fingerprint
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                {/* <View style={{width: 5}}>
                  <Image source={require('../images/Rectangle.png')} />
                </View> */}
                {biometryTypeState === 'FaceID' && (
                  <TouchableOpacity
                    onPress={() => useFaceId()}
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image source={require('../images/FaceId.png')} />
                      <Text style={{ width: 100, textAlign: 'center' }}>
                        Log in with Face ID
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  marginTop: 50,
                  alignSelf: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  resizeMode="contain"
                  style={{ width: PAGE_WIDTH - 186 }}
                  source={require('../images/Tagline.png')}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <LoadingModal />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topheader: {
    height: 250,
    padding: 24,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  textStyle: { fontSize: 35, fontWeight: 'bold', color: '#FFF' },
  textStyle2: { fontSize: 16, fontWeight: '400', color: '#FFF' },
  bottomSection: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  forgotButtonStyle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777777',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fad00e',
    marginBottom: 15,
  },
});
