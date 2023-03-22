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
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import TextField from '../components/inputField';
import React, {useState, useRef, useEffect} from 'react';
import IntlPhoneInput from 'react-native-international-telephone-input';
import {REACT_APP_BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

import SidebarLayout from '../layouts/sidebarLayout';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingModal from '../components/loadingScreen';
export default function MyAccount({navigation}) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(true);
  //const [photo, setPhoto] = React.useState(null);
  const [photo1, setPhoto1] = React.useState('');

  const [data, setData] = useState('');
  const [uri, setUri] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [filePath, setFilePath] = useState('');

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
          url: `${REACT_APP_BASE_URL}/alluser?id=${ids}`,
        })
          .then(res => {
            // console.log(res.data);
            setEmail(res.data.user.email);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setPhoneNumber(res.data.user.mobile);
            axios({
              method: 'GET',
              url: `${REACT_APP_BASE_URL}/files/${res.data.user.profilePicture}/true`,
              headers: {
                'x-auth-token': tokens,
              },
            })
              .then(res => {
                setUri(
                  `data:${res.headers['content-type']};base64,${res.data}`,
                );
              })
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                }
              });
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
                `${
                  er.response.data.message
                    ? er.response.data.message
                    : 'Something went wrong'
                }`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          });
      }
      getMyStringValue();
    }, []),
  );

  const chooseImage = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }

    // launchImageLibrary(options, response => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     setUri(response.uri);
    //     const source = response.uri;

    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //     // alert(JSON.stringify(response));s
    //     console.log('response', JSON.stringify(response));

    //     setFilePath(response);
    //     setFileData(response.data);
    //     setFileUri(response.assets[0].uri);
    //   }
    // });
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
    }).then(async image => {
      console.log(image);
      id = await AsyncStorage.getItem('@id');
      const form = new FormData();

      form.append('profilePicture', {
        name: image.path.split('/').pop(),
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      });

      form.append('id', id);
      axios({
        method: 'PUT',
        url: `${REACT_APP_BASE_URL}/profilePicture`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: form,
      });
      setFileUri(image.path);
    });
  };
  function renderFileUri() {
    // console.log(fileUri.length > 0);
    return fileUri.length > 1 ? (
      <View style={{marginBottom: 24}}>
        <Image
          style={{
            width: 110,
            height: 110,

            borderRadius: 50,
          }}
          source={{uri: fileUri}}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    ) : (
      <View style={{marginBottom: 24}}>
        <Image
          style={{
            width: 110,
            height: 110,
            borderRadius: 50,
          }}
          source={uri ? {uri: uri} : require('../images/placeholder.jpg')}
        />
        <Image style={styles.camera} source={require('../images/camera.png')} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eededf'}}>
      <View style={[styles.bottomSection, {padding: 24}]}>
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
              <TouchableOpacity onPress={chooseImage}>
                {renderFileUri()}
              </TouchableOpacity>

              <Text style={styles.textStyle2}>My Account</Text>
            </View>

            <SafeAreaView style={{marginBottom: 20}}>
              <Text style={styles.label}>First Name</Text>
              <TextField
                editable={false}
                value={firstName}
                onChangeText={text => setFirstName(text)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/User1.png')}
                      />
                    )}
                  />
                }
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <TouchableOpacity>
                //         <Image source={require('../images/Pencil.png')} />
                //       </TouchableOpacity>
                //     )}
                //   />
                // }
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
              <Text style={styles.label}>Last Name</Text>
              <TextField
                editable={false}
                value={lastName}
                onChangeText={text => setLastName(text)}
                left={
                  <TextInput.Icon
                    name={() => (
                      <Image
                        resizeMode="contain"
                        style={{width: 25}}
                        source={require('../images/User1.png')}
                      />
                    )}
                  />
                }
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <TouchableOpacity>
                //         <Image source={require('../images/Pencil.png')} />
                //       </TouchableOpacity>
                //     )}
                //   />
                // }
              />
            </SafeAreaView>

            <SafeAreaView style={{marginBottom: 20}}>
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
                        style={{width: 25}}
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

            <SafeAreaView style={{marginBottom: 20}}>
              <Text style={[styles.label, {marginBottom: 5}]}>
                Phone Number
              </Text>

              <TextField
                editable={false}
                value={(function () {
                  var match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
                  return match
                    ? `${match[1] ? match[1] : ''} ${
                        match[2] ? match[2] : ''
                      } ${match[3] ? match[3] : ''}`
                    : '';
                })()}
                onChangeText={text => setPhoneNumber(text)}
                // left={<TextInput.Icon name={() => <Text>+92</Text>} />}
                // right={
                //   <TextInput.Icon
                //     name={() => (
                //       <TouchableOpacity
                //         onPress={() => {
                //           navigation.navigate('UpdatePhone');
                //         }}>
                //         <Image source={require('../images/Pencil.png')} />
                //       </TouchableOpacity>
                //     )}
                //   />
                // }
              />
            </SafeAreaView>

            {/* <View style={{marginBottom: 20}}>
            <Text style={styles.label}>Password</Text>
            <TextField
              value={'dummypass'}
              secureTextEntry
              editable={false}
              onChangeText={text => setPassword(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Image source={require('../images/Password.png')} />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdatePassword');
                      }}>
                      <Image source={require('../images/Pencil.png')} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          </View> */}
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
  textStyle: {fontSize: 20, fontWeight: 'bold', color: '#000000'},
  textStyle2: {fontSize: 16, fontWeight: '600', color: '#cf3339'},
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
    backgroundColor: '#CF3339',
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
