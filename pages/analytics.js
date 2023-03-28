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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(207, 51, 57, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(207, 51, 57, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#CF3339',
  },
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  legendFontColor: '#CF3339',
};
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(207, 51, 57, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};
export default function Analytics({route, navigation}) {
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
                Analytics
              </Text>
            </View>

            <ScrollView>
              <View
                style={{
                  paddingHorizontal: 22,
                  marginTop: 5,
                  marginBottom: 15,
                }}>
                <LineChart
                  data={data}
                  width={PAGE_WIDTH}
                  height={220}
                  chartConfig={chartConfig}
                  getDotColor={() => {
                    return '#CF3339';
                  }}
                />
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  marginTop: 5,
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      Past Month
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      This Month
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      This Week
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      Custom Date
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      Start Date
                    </Text>
                  </View>
                  <View style={{width: '30%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                      }}>
                      End Date
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  marginTop: 5,
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      Sales
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      New Customers
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      Repeat Customer
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      Total Customers
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      Expenses
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: '#CF3339',
                        color: '#FFFFFF',
                        borderRadius: 15,
                        fontSize: 22,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        marginHorizontal: 10,
                        height: 100,
                        textAlignVertical: 'center',
                      }}>
                      Profitability
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
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
