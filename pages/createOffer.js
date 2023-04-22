import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';

import {Switch} from 'react-native-paper';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function CreateOffer({route, navigation}) {
  const [isSwitchOn, setIsSwitchOn] = useState(null);
  var temp =
    "Hi! It's been a while since we've seen you. We'd love to welcome you back to <Business Name> and are offering you <Selected package> off your next order!";
  const [message, setMessage] = useState(temp);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <LinearGradient
      colors={['#eedfe0', '#dbdcdc']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1, position: 'relative'}}>
            <View style={{padding: 24}}>
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
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
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
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
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
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  style={{
                    width: '10%',
                    margin: 5,
                  }}
                />
                <TouchableOpacity>
                  <Text style={{width: 170}}>Enter Discount Amount</Text>
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
                  onChangeText={text => setMessage({text})}
                  value={message}
                  style={{
                    height: 200,
                    width: '80%',
                    backgroundColor: '#ffffff',
                    textAlignVertical: 'top',
                    borderWidth: 3,
                    borderColor: '#fad00e',
                    borderRadius: 10,
                    padding: 20,
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
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
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
