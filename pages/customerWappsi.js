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
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import { TextInput } from 'react-native-paper';
import ServiceCard from '../components/serviceCard';
import LeadCard from '../components/leadCard';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '@env';
import { Switch } from 'react-native-paper';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function CustomerWappsi({ route, navigation }) {
  const [lead, setLead] = React.useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [pastDays, setPastDays] = useState(0);

  const renderItem = item => {
    console.log(item.item.order);
    const orderDate = new Date(item.item.order.createdAt);
    const d = new Date();
    const diffTime = Math.abs(d - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (
      <LeadCard
        PhoneNumber={item.item.order.phone}
        lastVisit={diffDays}
        totalSpend={item.item.order.total}
        selectAll={selectAll}
      />
    );
  };

  useFocusEffect(
    React.useCallback(() => {

      if (pastDays > 0) {
        var d = new Date();
        d.setDate(d.getDate() - pastDays);
        console.log(d)
        axios({
          method: 'GET',

          url: `${REACT_APP_BASE_URL}/getorder?daysLimit=${d}`,

        })
          .then(res => {
            setLead(res.data.order);
          })
          .catch(err => console.log(err));



      } else {
        axios({
          method: 'GET',
          url: `${REACT_APP_BASE_URL}/getorder`,
        })
          .then(res => {
            setLead(res.data.order);
          })
          .catch(err => console.log(err));
      }





    }, [shouldUpdate, pastDays]),
  );

  return (
    <LinearGradient
      colors={['#fad00e', '#ffd40e']}
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
                paddingTop: 12,
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
                Customer Wappsi
              </Text>
            </View>
            <Text style={{ textAlign: 'center' }}>
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
                  style={[{ height: 18, borderColor: 'red' }]}
                  maxLength={3}
                  value={pastDays}
                  onChangeText={text => {
                    setPastDays(text);
                  }}
                  activeUnderlineColor={'red'}
                />
                <Text style={{ fontWeight: 'bold' }}> Days</Text>
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
              <Text style={{ width: '32%', textAlign: 'center' }}>
                Phone Number
              </Text>
              <Text style={{ width: '22%', textAlign: 'center' }}>
                Last Visit
              </Text>
              <Text style={{ width: '22%', textAlign: 'center' }}>
                Total Spend
              </Text>

              <Text style={{ width: '22%', textAlign: 'center' }}>Message</Text>
            </View>
            <View style={{
              display: 'flex', flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 42,
              paddingTop: 22,
            }}>

              <Text>
                Select All
              </Text>
              <Switch
                color="#FFF"
                value={selectAll}
                onValueChange={() => { setSelectAll(!selectAll) }}
              // style={{ width: '22%' }}
              />

            </View>

            <FlatList
              style={{
                marginTop: 12,
                paddingHorizontal: 24,
                zIndex: 10,
              }}
              data={lead}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            // extraData={selectedId}
            />
          </SafeAreaView>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateOffer');
            }}
            style={[
              {
                backgroundColor: '#141414',
                display: 'flex',
                alignItems: 'center',
              },
              styles.bottomContainer,
            ]}>
            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>
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
