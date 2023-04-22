import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import Lottie from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform} from 'react-native';
import {REACT_APP_BASE_URL} from '@env';
import {socket} from '../sockets/socketConfig';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function BookAnAppointment({route, navigation}) {
  const [id, setId] = useState(null);
  const [allFiles, setAllFiles] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [company, setCompany] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        const token = await AsyncStorage.getItem('@jwt');
        const id = await AsyncStorage.getItem('@id');
        setId(id);
        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/consultant`,
        })
          .then(async res => {
            var allConsultants = [];

            for await (const el of res.data.consultant) {
              const file = await axios({
                method: 'GET',
                url: `${REACT_APP_BASE_URL}/files/${el.picture}/true`,
                headers: {
                  'x-auth-token': token,
                },
              }).catch(err => console.log(err));

              var language = (stringwithcomma = el.language
                .map(element => element)
                .join(' - '));

              allConsultants.push({
                image: `data:${file.headers['content-type']};base64,${file.data}`,
                name: `${el.firstName} ${el.lastName}`,
                languages: language,
              });
            }
            console.log(res.data);
            setAllFiles(allConsultants);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);

              Alert.alert(
                'Failed',
                `${
                  error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong'
                }`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              );
            }
          });
      }
      getData();
      // func();
    }, []),
  );

  async function sendInquiry(name) {
    socket.emit(
      'recieveNotification',
      id,
      `Appointment Booking`,
      `Booked an appointment for ${name}.`,
      new Date(),
    );
    setModalVisible(true);
  }

  // async function func() {
  //   const token = await AsyncStorage.getItem('@jwt');
  //   const id = await AsyncStorage.getItem('@id');
  //   const companyData = await axios({
  //     method: 'GET',
  //     url: `${REACT_APP_BASE_URL}/company?owner=${id}`,
  //   }).catch(err => console.log(err));
  //   console.log(companyData.data.company[0].relationshipManagerName);
  //   setCompany(companyData.data.company[0]);
  // }

  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 24}}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={[
                styles.centeredView,
                modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
              ]}>
              <View style={styles.modalView}>
                {/* <Image
                style={{width: 150, height: 150}}
                resizeMode="contain"
                source={require('../images/Icon.png')}
              /> */}

                <Lottie
                  resizeMode="cover"
                  style={{
                    width: 150,
                    // height: '100%',
                  }}
                  source={require('../images/success_lottie.json')}
                  loop={false}
                  autoPlay
                />

                <Text
                  style={{
                    paddingTop: 31,
                    fontSize: 24,
                    fontWeight: '500',
                    color: '#1A8E2D',
                    textAlign: 'center',
                  }}>
                  Request Submitted
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  Thank you for your inquiry. The consultant of your choice will
                  be in touch shortly.
                </Text>
                <Pressable
                  style={[styles.doneButton]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={{color: '#FFF', fontSize: 17, fontWeight: '700'}}>
                    Done
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <SafeAreaView style={{flex: 1}}>
            <SidebarLayout header={'Book An Appointment'} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingTop: 12,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{alignItems: 'flex-start'}}>
                <Image
                  style={{padding: 0, alignSelf: 'flex-start'}}
                  source={require('../images/BackBlack.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#222222',
                  textAlign: 'center',
                  width: PAGE_WIDTH - 125,
                }}>
                Book An Appointment
              </Text>
            </View>

            {allFiles.length > 0 && (
              <FlatList
                style={{paddingTop: 12}}
                data={allFiles}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: (PAGE_WIDTH - 86) / 2,
                      // paddingTop: 14,
                      marginVertical: 11,
                      marginLeft: 14,
                      // paddingHorizontal: 25,
                      overflow: 'hidden',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 16,
                      backgroundColor: '#fff',
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{
                        borderRadius: 16,
                        width: (PAGE_WIDTH - 86) / 2,
                        height: 150,
                      }}
                      source={{uri: item.image}}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        flex: 1,
                        paddingTop: 11,
                        fontWeight: '600',
                        color: '#fad00e',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        flex: 1,
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      {item.languages}
                    </Text>
                    <TouchableOpacity
                      style={{width: '100%'}}
                      onPress={() => sendInquiry(item.name)}>
                      <View
                        style={{
                          backgroundColor: '#fad00e',
                          marginTop: 11,
                          paddingVertical: 9,
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#fff',
                            textAlign: 'center',
                          }}>
                          Book Now
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                numColumns={2}
              />
            )}

            {/* <View
              style={{
                width: (PAGE_WIDTH - 86) / 2,
                // paddingTop: 14,
                marginVertical: 11,
                marginLeft: 14,
                // paddingHorizontal: 25,
                overflow: 'hidden',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                backgroundColor: '#fff',
              }}>
              <Image
                resizeMode="cover"
                resizeMethod="resize"
                style={{
                  borderRadius: 16,
                  width: (PAGE_WIDTH - 86) / 2,
                  height: 150,
                }}
                source={require('../images/person-dummy.jpg')}
                // source={{
                //   uri: 'https://vz2021--2021.sandbox.file.force.com/profilephoto/005/F',
                // }}
              />
              <Text
                style={{
                  fontSize: 14,
                  paddingTop: 11,
                  fontWeight: '600',
                  color: '#fad00e',
                }}>
                {company?.relationshipManagerName}
              </Text>
     
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => sendInquiry(company?.relationshipManagerName)}>
                <View
                  style={{
                    backgroundColor: '#fad00e',
                    marginTop: 11,
                    paddingVertical: 9,
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#fff',
                      textAlign: 'center',
                    }}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },

  pdf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  doneButton: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 40,
    marginBottom: 16,
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
