import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import { Modal } from 'react-native-paper';
import { Switch } from 'react-native-paper';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');
import { TextInput } from 'react-native-paper';
export default function CreateOffer({ route, navigation }) {

  const [discountP, setDiscountP] = useState(null);
  const [discountA, setDiscountA] = useState(null);

  const [isServicesSwitchOn, setIsServicesSwitchOn] = useState(false);
  const [isDiscountPSwitchOn, setIsDiscountPSwitchOn] = useState(false);
  const [isDiscountASwitchOn, setIsDiscountASwitchOn] = useState(false);

  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [discountAModalVisible, setDiscountAModalVisible] = useState(false);



  const [message, setMessage] = useState("Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you <Selected package> off your next order!");




  const containerStyle = {
    backgroundColor: '#eedfe0',
    padding: 20,
    width: '100%',
  };
  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <View style={{ padding: 24 }}>
              <SidebarLayout header={'Business Support'} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingVertical: 12,
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ alignItems: 'flex-start' }}>
                <Image
                  style={{ padding: 0, alignSelf: 'flex-start' }}
                  source={require('../images/BackBlack.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#222222',
                  textAlign: 'center',
                  width: PAGE_WIDTH - 75,
                }}>
                Create Offer
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // height: '50 %',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '25%',
                }}>
                <Switch
                  color="#fad00e"
                  value={isServicesSwitchOn}
                  onValueChange={(value) => {
                    if (value) {
                      setIsServicesSwitchOn(true)
                      setIsDiscountASwitchOn(false)
                      setIsDiscountPSwitchOn(false)
                    } else {
                      setIsServicesSwitchOn(false)
                    }

                  }}
                  style={{
                    width: '10%',
                    margin: 5,
                  }}
                />
                <TouchableOpacity>
                  <Text>Select from List of Services</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '25%',
                }}>
                <Switch
                  color="#fad00e"
                  value={isDiscountPSwitchOn}
                  onValueChange={(value) => {
                    if (value) {
                      setIsServicesSwitchOn(false)
                      setIsDiscountASwitchOn(false)
                      setIsDiscountPSwitchOn(true)
                      setDiscountModalVisible(true)
                    } else {
                      setIsDiscountPSwitchOn(false)
                    }
                  }}
                  style={{
                    width: '10%',
                    margin: 5,
                  }}
                />
                <TouchableOpacity>
                  <Text>Enter Discount Percentage</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '25%',
                }}>
                <Switch
                  color="#fad00e"
                  value={isDiscountASwitchOn}
                  onValueChange={(value) => {
                    if (value) {
                      setIsServicesSwitchOn(false)
                      setIsDiscountASwitchOn(true)
                      setIsDiscountPSwitchOn(false)
                      setDiscountAModalVisible(true)
                    } else {
                      setIsDiscountASwitchOn(false)
                    }
                  }}
                  style={{
                    width: '10%',
                    margin: 5,
                  }}
                />
                <TouchableOpacity>
                  <Text style={{ width: 170 }}>Enter Discount Amount</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 50,
                }}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={text => setMessage({ text })}
                  value={message}
                  style={{
                    width: '80%',
                    backgroundColor: '#ffffff',
                    textAlignVertical: 'top',
                    borderWidth: 3,
                    borderColor: '#fad00e',
                    borderRadius: 10,
                    padding: 2,
                  }}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 50,
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
                  15 Customers Selected
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#fad00e',
                    padding: 20,
                    borderRadius: 15,
                    marginTop: 12,
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    Send Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visible={discountModalVisible}
              onDismiss={() => {
                setDiscountModalVisible(false)
                setMessage(`Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you ${discountP} % off your next order!`)
              }}
              contentContainerStyle={containerStyle}>
              <KeyboardAwareScrollView>
                <SafeAreaView>
                  <TextInput
                    keyboardType='numeric'
                    value={discountP}
                    maxLength={2}
                    activeUnderlineColor={'red'}
                    onChangeText={text => {
                      setDiscountP(text);
                    }}
                    style={{
                      backgroundColor: '#ffffff',
                      width: PAGE_WIDTH - 50,
                      borderWidth: 1,
                      borderColor: '#fad00e',
                      borderRadius: 5,
                      padding: 10,
                      marginHorizontal: 5,
                      marginBottom: 15,
                      height: 22,
                    }}
                    placeholder="Discount Percentage"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setDiscountModalVisible(false);
                      setMessage(`Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you ${discountP} % off your next order!`)
                    }}
                    style={[
                      {
                        backgroundColor: '#fad00e',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 15,
                        paddingVertical: 20,
                      },
                    ]}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </KeyboardAwareScrollView>
            </Modal>



            <Modal
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visible={discountAModalVisible}
              onDismiss={() => {
                setDiscountAModalVisible(false)
                setMessage(`Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you ${discountA} Rs/- off your next order!`)
              }}
              contentContainerStyle={containerStyle}>
              <KeyboardAwareScrollView>
                <SafeAreaView>
                  <TextInput
                    keyboardType='numeric'
                    value={discountP}
                    activeUnderlineColor={'red'}
                    onChangeText={text => {
                      setDiscountA(text);
                    }}
                    style={{
                      backgroundColor: '#ffffff',
                      width: PAGE_WIDTH - 50,
                      borderWidth: 1,
                      borderColor: '#fad00e',
                      borderRadius: 5,
                      padding: 10,
                      marginHorizontal: 5,
                      marginBottom: 15,
                      height: 22,
                    }}
                    placeholder="Discount Amount"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setDiscountAModalVisible(false);
                      setMessage(`Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you ${discountA} Rs/- off your next order!`)
                    }}
                    style={[
                      {
                        backgroundColor: '#fad00e',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 15,
                        paddingVertical: 20,
                      },
                    ]}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </KeyboardAwareScrollView>
            </Modal>
          </SafeAreaView>
        </View>



      </SafeAreaView>

    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 22,
    textAlign: 'center',
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
  },

  bottomContainer: {
    display: 'flex',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  feildContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  feildText: {
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
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
