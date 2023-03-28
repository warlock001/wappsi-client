import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  Pressable,
  SafeAreaView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import {TextInput} from 'react-native-paper';
import ServiceCard from '../components/serviceCard';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function NewOrder({route, navigation}) {
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
                  width: PAGE_WIDTH - 75,
                }}>
                New Order
              </Text>
            </View>

            <ScrollView
              style={{
                marginTop: 24,
                paddingHorizontal: 24,
                zIndex: 10,
              }}>
              <ServiceCard serviceName="Haircut" servicePrice="200" />
              <ServiceCard serviceName="Beard Trim" servicePrice="150" />
              <ServiceCard serviceName="Massage" servicePrice="200" />
              <ServiceCard serviceName="Kids Haircut" servicePrice="250" />
              <ServiceCard serviceName="Hair Dying" servicePrice="400" />
              <ServiceCard serviceName="Hair Treatment" servicePrice="1200" />
              <ServiceCard serviceName="Steam Wash" servicePrice="500" />
              <ServiceCard serviceName="Facial" servicePrice="300" />
              <ServiceCard serviceName="Beard Trim" servicePrice="150" />
              <ServiceCard serviceName="Massage" servicePrice="200" />
              <ServiceCard serviceName="Kids Haircut" servicePrice="250" />
              <ServiceCard serviceName="Hair Dying" servicePrice="400" />
              <ServiceCard serviceName="Hair Treatment" servicePrice="1200" />
              <ServiceCard serviceName="Steam Wash" servicePrice="500" />
              <ServiceCard serviceName="Facial" servicePrice="300" />
            </ScrollView>
          </SafeAreaView>
          <View style={styles.bottomContainer}>
            <View style={styles.feildContainer}>
              <Text
                style={[
                  styles.feildText,
                  {
                    width: '50%',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    fontSize: 12,
                  },
                ]}>
                <Text style={{color: '#CF3339', fontSize: 12}}>Sub Total</Text>{' '}
                : 500 PKR
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={[styles.feildText, {color: '#CF3339', fontSize: 12}]}>
                  Discount :{' '}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={[{height: 18}]}
                  maxLength={2}
                  value={0}
                />
                <Text style={[styles.feildText, {fontSize: 12}]}>%</Text>
              </View>
            </View>

            <View style={styles.feildContainer}>
              <Text
                style={[
                  styles.feildText,
                  {width: '50%', textAlign: 'center', paddingHorizontal: 10},
                ]}>
                <Text style={{color: '#CF3339', fontSize: 12}}>
                  Discounted Amount
                </Text>
                : 500 PKR
              </Text>
              <Text
                style={[
                  styles.feildText,
                  {
                    width: '50%',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    fontSize: 12,
                  },
                ]}>
                <Text style={{color: '#CF3339', fontSize: 12}}>Total</Text>: 500
                PKR
              </Text>
            </View>

            <View style={{paddingHorizontal: 24}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#CF3339',
                  paddingVertical: 10,
                  borderRadius: 10,
                }}>
                <Text style={{textAlign: 'center', color: '#FFFFFF'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: '#ffffff',
    display: 'flex',
    height: 170,
    paddingHorizontal: 24,
    paddingVertical: 25,
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
    fontSize: 12,
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
