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
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import ServiceCard from '../components/serviceCard';
import LeadCard from '../components/leadCard';
import InputField from '../components/inputField';
import {RadioButton, DataTable} from 'react-native-paper';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function ExpenseTracker({route, navigation}) {
  const [value, setValue] = React.useState('first');

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
                Expense Tracker
              </Text>
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
                style={{
                  backgroundColor: '#ffffff',
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#CF3339',
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
                style={{
                  backgroundColor: '#ffffff',
                  width: '90%',
                  borderWidth: 1,
                  borderColor: '#CF3339',
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
                    <RadioButton color={'#CF3339'} value="Salaries" />
                    <Text>Salaries</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Electricity" />
                    <Text>Electricity</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Gas" />
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
                    <RadioButton color={'#CF3339'} value="Rent" />
                    <Text>Rent</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Equipments" />
                    <Text>Health</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Fuel" />
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
                    <RadioButton color={'#CF3339'} value="Food" />
                    <Text>Food</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Gifts" />
                    <Text>Gifts</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '35%',
                    }}>
                    <RadioButton color={'#CF3339'} value="Drinks" />
                    <Text>Drinks</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>

            <ScrollView
              style={{
                marginTop: 12,
                paddingHorizontal: 24,
                zIndex: 10,
              }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Date</DataTable.Title>
                  <DataTable.Title>Category</DataTable.Title>
                  <DataTable.Title numeric>Amount</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Drinks</Text>
                    <Text> - Tea</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 80</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Salaries</Text>
                    <Text> - Ahmad</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 30000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Security</Text>
                    <Text> - Police</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 5000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Electricity</Text>
                    <Text> - KE</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 12000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Salaries</Text>
                    <Text> - Ali</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 35000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Rent</Text>
                    <Text> - rent</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 25000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Dec 25</DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={{fontWeight: 'bold'}}>Fuel</Text>
                    <Text> - bike</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>PKR 410</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
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
            <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Enter</Text>
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
