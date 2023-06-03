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
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import ServiceCard from '../components/serviceCard';
import LeadCard from '../components/leadCard';
import InputField from '../components/inputField';
import { RadioButton, DataTable } from 'react-native-paper';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '@env';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get('window');

export default function ExpenseTracker({ route, navigation }) {
  const [value, setValue] = React.useState('first');
  const [expense, setExpense] = React.useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState('');

  const renderItem = item => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const datetime = new Date(item.item.createdAt);
    const month = monthNames[datetime.getMonth()];
    const date = datetime.getDate();
    return (
      <DataTable.Row>
        <DataTable.Cell>
          {month} - {date}
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ fontWeight: 'bold' }}>{item.item.category}</Text>
          <Text> - {item.item.note}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>PKR {item.item.price}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  const postData = async () => {
    console.log('here');
    await axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/postexpense`,
      data: {
        category: value,
        note: note,
        price: price,
      },
    })
      .then(async res => {
        setValue('');
        setShouldUpdate(!shouldUpdate);
        setPrice(0);
        setNote('');

        if (Platform.OS === 'android') {
          ToastAndroid.show('Expense Saved', ToastAndroid.LONG);
        } else {
          AlertIOS.alert('Expense Saved');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/getexpense`,
      })
        .then(res => {
          console.log(res.data.expense);
          setExpense(res.data.expense);
        })
        .catch(err => console.log(err));
    }, [shouldUpdate]),
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
                  color: '#0e1437',
                  textAlign: 'center',
                  width: PAGE_WIDTH - 75,
                }}>
                Expense Tracker
              </Text>
            </View>
            <ScrollView>
              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TextInput
                  keyboardType="numeric"
                  value={price}
                  onChangeText={text => {
                    setPrice(text);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    width: '90%',
                    borderWidth: 1,
                    borderColor: '#fad00e',
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 5,
                  }}
                  placeholder="PKR"
                />
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TextInput
                  value={note}
                  onChangeText={text => {
                    setNote(text);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    width: '90%',
                    borderWidth: 1,
                    borderColor: '#fad00e',
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 5,
                  }}
                  placeholder="Expense Notes"
                />
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: 15,
                    color: '#0e1437',
                  }}>
                  Expense Categories
                </Text>

                <RadioButton.Group
                  onValueChange={newValue => setValue(newValue)}
                  value={value}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Salaries" />
                      <Text>Salaries</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Electricity" />
                      <Text>Electricity</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Gas" />
                      <Text>Gas</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Rent" />
                      <Text>Rent</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Equipments" />
                      <Text>Health</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Fuel" />
                      <Text>Fuel</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Food" />
                      <Text>Food</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Gifts" />
                      <Text>Gifts</Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '35%',
                      }}>
                      <RadioButton color={'#0e1437'} value="Drinks" />
                      <Text>Drinks</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>

              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Date</DataTable.Title>
                  <DataTable.Title>Category</DataTable.Title>
                  <DataTable.Title numeric>Amount</DataTable.Title>
                </DataTable.Header>

                <View
                  style={{
                    // marginTop: 12,
                    paddingHorizontal: 5,
                    // zIndex: 10,
                    // height: 500,
                  }}>
                  <FlatList
                    // style={{marginBottom: 24}}
                    data={expense}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                  // extraData={selectedId}
                  />
                </View>
              </DataTable>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.bottomContainer}>
            {/* <View style={styles.feildContainer}> */}
            <TouchableOpacity
              onPress={() => {
                postData();
              }}
              style={[
                {
                  backgroundColor: '#fad00e',
                  // display: 'flex',
                  // alignItems: 'center',
                  width: '100%',
                  paddingVertical: 10,
                  borderRadius: 10,
                },
                // styles.bottomContainer,
              ]}>
              <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Enter</Text>
            </TouchableOpacity>
            {/* </View> */}
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
    display: 'flex',
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF'
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
