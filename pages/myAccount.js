import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import TextField from '../components/inputField';
import React, { useState, useRef, useEffect } from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import { REACT_APP_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CurrencyPicker from "react-native-currency-picker"
import SidebarLayout from '../layouts/sidebarLayout';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingModal from '../components/loadingScreen';
export default function MyAccount({ navigation }) {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loader, setLoader] = useState(true);
  //const [photo, setPhoto] = React.useState(null);
  const [photo1, setPhoto1] = React.useState('');

  const [data, setData] = useState('');
  const [uri, setUri] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [filePath, setFilePath] = useState('');
  let currencyPickerRef = undefined;
  var id;
  useFocusEffect(
    React.useCallback(() => {
      getMyStringValue = async () => {
        try {
          id = await AsyncStorage.getItem('@id');
          token = await AsyncStorage.getItem('@jwt');
          console.log(id);
          if (id) {
            getData(id, token);
          } else {
          }
        } catch (e) {
          console.log(e);
        }
      };

      function getData(ids, tokens) {
        setLoader(true);

        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/user?id=${ids}`,
        })
          .then(res => {
            console.log(res.data);
            setEmail(res.data.user[0].email);
            setFullName(res.data.user[0].name);
            setLoader(false);
            console.log(res.data.user);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              setLoader(false);
              console.log(er.response.data);

              Alert.alert(
                'Failed',
                `${er.response.data.message
                  ? er.response.data.message
                  : 'Something went wrong'
                }`,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              );
            }
          });
      }
      getMyStringValue();
    }, []),
  );



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eededf' }}>
      <View style={[styles.bottomSection, { padding: 24 }]}>
        <SidebarLayout header={'My Account'} />
        {!loader ? (
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              paddingVertical: 24,
              marginBottom: 70,
            }}>
            <View style={styles.profilePicture}>


              <Text style={styles.textStyle2}>My Account</Text>
            </View>

            <SafeAreaView style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Full Name</Text>
              <TextField
                editable={false}
                value={fullName}
                onChangeText={text => setFullName(text)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{ width: 25 }}
                        source={require('../images/User1.png')}
                      />
                    )}
                  />
                }

              />
            </SafeAreaView>



            <SafeAreaView style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Email Address</Text>

              <TextField
                editable={false}
                value={email}
                onChangeText={text => setEmail(text)}
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
              // right={
              //   <TextInput.Icon
              //     name={() => (
              //       <TouchableOpacity
              //         onPress={() => {
              //           navigation.navigate('UpdateEmail');
              //         }}>
              //         <Image source={require('../images/Pencil.png')} />
              //       </TouchableOpacity>
              //     )}
              //   />
              // }
              />
            </SafeAreaView>

            <SafeAreaView style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                Phone Number
              </Text>

              <TextField
                editable={false}
                value={(function () {
                  var match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
                  return match
                    ? `${match[1] ? match[1] : ''} ${match[2] ? match[2] : ''
                    } ${match[3] ? match[3] : ''}`
                    : '';
                })()}
                onChangeText={text => setPhoneNumber(text)}
                left={<TextInput.Icon name={() => <Text>+92</Text>} />}

              />
            </SafeAreaView>

            <SafeAreaView style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                Company Name
              </Text>

              <TextField
                editable={false}
                value={(function () {
                  var match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
                  return match
                    ? `${match[1] ? match[1] : ''} ${match[2] ? match[2] : ''
                    } ${match[3] ? match[3] : ''}`
                    : '';
                })()}
                onChangeText={text => setPhoneNumber(text)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{ width: 25 }}
                        source={require('../images/briefcase.png')}
                      />
                    )}
                  />
                }

              />
            </SafeAreaView>

            <SafeAreaView style={{ marginBottom: 20 }}>
              <Text style={[styles.label, { marginBottom: 5 }]}>
                Currency
              </Text>
              <SafeAreaView style={{ backgroundColor: '#ffffff', marginHorizontal: 2, marginVertical: 5, paddingVertical: 15, paddingHorizontal: 10, borderRadius: 10 }}>

                <CurrencyPicker

                  currencyPickerRef={(ref) => { currencyPickerRef = ref }}
                  enable={true}
                  darkMode={false}
                  currencyCode={"PKR"}
                  showFlag={true}
                  showCurrencyName={true}
                  showCurrencyCode={true}
                  onSelectCurrency={(data) => { console.log("DATA", data) }}
                  onOpen={() => { console.log("Open") }}
                  onClose={() => { console.log("Close") }}
                  showNativeSymbol={true}
                  showSymbol={false}
                  containerStyle={{
                    container: { alignItems: 'center', display: 'flex' },
                    flagWidth: 25,
                    currencyCodeStyle: {},
                    currencyNameStyle: {},
                    symbolStyle: {},
                    symbolNativeStyle: {}
                  }}
                  modalStyle={{
                    container: {},
                    searchStyle: {},
                    tileStyle: {},
                    itemStyle: {
                      itemContainer: {},
                      flagWidth: 25,
                      currencyCodeStyle: {},
                      currencyNameStyle: {},
                      symbolStyle: {},
                      symbolNativeStyle: {}
                    }
                  }}
                  title={"Currency"}
                  searchPlaceholder={"Search"}
                  showCloseButton={true}
                  showModalTitle={true}
                />
              </SafeAreaView>
            </SafeAreaView>


          </ScrollView>
        ) : (
          <LoadingModal />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menubar: {
    padding: 24,
    flex: 1,
  },
  profilePicture: {
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    top: 90,
    right: 10,
  },
  topheader: {
    height: 300,
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: { fontSize: 20, fontWeight: 'bold', color: '#000000' },
  textStyle2: { fontSize: 16, fontWeight: '600', color: '#fad00e' },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },

  bottomSection: {
    height: '100%',
    width: '100%',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.20)',
    roundness: 10,
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
  },
  signInButton: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fad00e',
    marginBottom: 16,
  },
  otpBox: {
    borderRadius: 15,
    width: 50,
    padding: 20,
    height: 60,
    backgroundColor: '#d5d3d3',
    borderWidth: 1,
    color: '#000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
