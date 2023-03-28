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
import LeadCard from '../components/leadCard';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function CustomerWappsi({route, navigation}) {
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
                Customer Wappsi
              </Text>
            </View>
            <Text style={{textAlign: 'center'}}>
              Customer from less than 3 weeks are not shown to reduce spamming
            </Text>
            <View
              style={{
                paddingHorizontal: 22,
                marginTop: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: 3,
                }}>
                Show Customers who haven't visited from the past
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <TextInput
                  keyboardType="numeric"
                  style={[{height: 18, borderColor: 'red'}]}
                  maxLength={3}
                  value={0}
                  activeUnderlineColor={'red'}
                />
                <Text style={{fontWeight: 'bold'}}>Days</Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 22,
                paddingTop: 22,
                marginTop: 5,
              }}>
              <Text style={{width: '32%', textAlign: 'center'}}>
                Phone Number
              </Text>
              <Text style={{width: '22%', textAlign: 'center'}}>
                Last Visit
              </Text>
              <Text style={{width: '22%', textAlign: 'center'}}>
                Total Spend
              </Text>

              <Text style={{width: '22%', textAlign: 'center'}}>Message</Text>
            </View>
            <ScrollView
              style={{
                marginTop: 12,
                paddingHorizontal: 24,
                zIndex: 10,
              }}>
              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="43"
                totalSpend="500"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="64"
                totalSpend="108"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="67"
                totalSpend="562"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="95"
                totalSpend="493"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="22"
                totalSpend="768"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="35"
                totalSpend="121"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="44"
                totalSpend="500"
              />

              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="56"
                totalSpend="500"
              />
              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="56"
                totalSpend="500"
              />
              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="56"
                totalSpend="500"
              />
              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="56"
                totalSpend="500"
              />
              <LeadCard
                PhoneNumber="03062925548"
                lastVisit="56"
                totalSpend="500"
              />
            </ScrollView>
          </SafeAreaView>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateOffer');
            }}
            style={[
              {
                backgroundColor: '#CF3339',
                display: 'flex',
                alignItems: 'center',
              },
              styles.bottomContainer,
            ]}>
            <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
              Create Offer
            </Text>
          </TouchableOpacity>
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
