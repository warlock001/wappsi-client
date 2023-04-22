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
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SidebarLayout from '../layouts/sidebarLayout';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import ServiceCard from '../components/serviceCard';
import LeadCard from '../components/leadCard';
import {REACT_APP_BASE_URL} from '@env';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import axios from 'axios';
import {Dialog, Portal, Provider} from 'react-native-paper';

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const chartConfig = {
  decimalPlaces: 1,
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(207, 51, 57, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(207, 51, 57, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#001438',
  },
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  legendFontColor: '#fad00e',
};

export default function Analytics({route, navigation}) {
  ////Toggle Buttons////
  const [salesButtonActive, setSalesButtonActive] = useState(true);
  const [newCustomerButtonActive, setNewCustomerButtonActive] = useState(false);
  const [repeatCustomerButtonActive, setRepeatCustomerButtonActive] =
    useState(false);
  const [totalCustomerButtonActive, setTotalCustomerButtonActive] =
    useState(false);
  const [expensesButtonActive, setExpensesButtonActive] = useState(false);
  const [profitabilityButtonActive, setProfitabilityButtonActive] =
    useState(false);

  const [pastMonthButtonActive, setPastMonthButtonActive] = useState(true);
  const [thisMonthButtonActive, setThisMonthButtonActive] = useState(false);
  const [thisWeekButtonActive, setThisWeekButtonActive] = useState(false);
  const [customDateButtonActive, setcustomDateButtonActive] = useState(false);
  const [startDateButtonActive, setStartDateButtonActive] = useState(false);
  const [endDateButtonActive, setEndDateButtonActive] = useState(false);

  const [activeRoute, setActiveRoute] = useState('sales');

  const SetAllButtonsFalse = () => {
    setSalesButtonActive(false);
    setNewCustomerButtonActive(false);
    setRepeatCustomerButtonActive(false);
    setTotalCustomerButtonActive(false);
    setExpensesButtonActive(false);
    setProfitabilityButtonActive(false);
  };

  const SetAllPeriodsFalse = () => {
    setPastMonthButtonActive(false);
    setThisMonthButtonActive(false);
    setThisWeekButtonActive(false);
    setcustomDateButtonActive(false);
    setStartDateButtonActive(false);
    setEndDateButtonActive(false);
  };
  ////Toggle Buttons End////

  const [sales, setSales] = useState([]);
  const [date, setDate] = useState(new Date());
  const [openCustom, setOpenCustom] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [data, setData] = useState({
    labels: [1, 30],
    datasets: [
      {
        data: [0, 0],
      },
    ],
  });

  useFocusEffect(
    React.useCallback(() => {
      getSalesPastMonth('sales');
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const tempData = {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      };

      if (sales.length != 0) {
        console.log(sales);
        sales.forEach(item => {
          console.log(item);
          tempData.labels.push(item.date);
          tempData.datasets[0].data.push(item.total);
        });

        setData(tempData);
      }
    }, [sales]),
  );

  async function getSalesPastMonth(route) {
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${route}?period=pastMonth `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  }

  // async function getSalesPastMonth() {
  //   await axios({
  //     method: 'GET',
  //     url: `${REACT_APP_BASE_URL}/${activeRoute}?period=pastMonth `,
  //   })
  //     .then(res => {
  //       if (res.data.sales.length == 0) {
  //         Alert.alert('No Data Found.');
  //         setData({
  //           labels: [0],
  //           datasets: [
  //             {
  //               data: [0],
  //             },
  //           ],
  //         });
  //       } else {
  //         setSales(res.data.sales);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  const getSalesThisMonth = async () => {
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${activeRoute}?period=thisMonth `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  };

  const getSalesThisWeek = async () => {
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${activeRoute}?period=thisWeek `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  };

  const getSalesCustomDate = async date => {
    date = new Date(date);
    date.setHours('00');
    date.setMinutes('00');
    date.setSeconds('00');
    console.log(date);
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${activeRoute}?period=customDate&date=${date} `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  };

  const getSalesStartDate = async date => {
    date = new Date(date);
    date.setHours('00');
    console.log(date);
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${activeRoute}?period=startDate&date=${date} `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  };

  const getSalesEndDate = async date => {
    date = new Date(date);
    date.setHours('00');
    console.log(date);
    await axios({
      method: 'GET',
      url: `${REACT_APP_BASE_URL}/${activeRoute}?period=endDate&date=${date} `,
    })
      .then(res => {
        if (res.data.sales.length == 0) {
          Alert.alert('No Data Found.');
          setData({
            labels: [0],
            datasets: [
              {
                data: [0],
              },
            ],
          });
        } else {
          setSales(res.data.sales);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <LinearGradient
      colors={['#fad00e', '#ffd40e']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <DatePicker
        mode="date"
        modal
        open={openCustom}
        date={date}
        onConfirm={date => {
          setOpenCustom(false);
          getSalesCustomDate(date);
        }}
        onCancel={() => {
          setOpenCustom(false);
        }}
      />

      <DatePicker
        mode="date"
        modal
        open={openStart}
        date={date}
        onConfirm={date => {
          setOpenStart(false);
          getSalesStartDate(date);
        }}
        onCancel={() => {
          setOpenStart(false);
        }}
      />

      <DatePicker
        mode="date"
        modal
        open={openEnd}
        date={date}
        onConfirm={date => {
          setOpenEnd(false);
          getSalesEndDate(date);
        }}
        onCancel={() => {
          setOpenEnd(false);
        }}
      />

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
                  fromZero={true}
                  getDotColor={() => {
                    return '#001438';
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
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setPastMonthButtonActive(true);
                      getSalesPastMonth(activeRoute);
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            pastMonthButtonActive == true
                              ? '#0e1437'
                              : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        Past Month
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setThisMonthButtonActive(true);
                      getSalesThisMonth();
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            thisMonthButtonActive == true
                              ? '#0e1437'
                              : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        This Month
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setThisWeekButtonActive(true);
                      getSalesThisWeek();
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            thisWeekButtonActive == true
                              ? '#0e1437'
                              : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        This Week
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setcustomDateButtonActive(true);
                      setOpenCustom(true);
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            customDateButtonActive == true
                              ? '#0e1437'
                              : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        Custom Date
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setStartDateButtonActive(true);
                      setOpenStart(true);
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            startDateButtonActive == true
                              ? '#0e1437'
                              : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        Start Date
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '30%'}}
                    onPress={() => {
                      SetAllPeriodsFalse();
                      setEndDateButtonActive(true);
                      setOpenEnd(true);
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          backgroundColor:
                            endDateButtonActive == true ? '#0e1437' : '#564d2a',
                          color: '#FFFFFF',
                          borderRadius: 15,
                          paddingVertical: 5,
                          marginHorizontal: 5,
                        }}>
                        End Date
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      setActiveRoute('sales');
                      SetAllButtonsFalse();
                      SetAllPeriodsFalse();
                      setPastMonthButtonActive(true);
                      setSalesButtonActive(true);
                      getSalesPastMonth('sales');
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          salesButtonActive == true ? '#0e1437' : '#564d2a',
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      setActiveRoute('customers');
                      SetAllButtonsFalse();
                      SetAllPeriodsFalse();
                      setPastMonthButtonActive(true);
                      setNewCustomerButtonActive(true);
                      getSalesPastMonth('customers');
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          newCustomerButtonActive == true
                            ? '#0e1437'
                            : '#564d2a',
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
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      SetAllButtonsFalse();
                      setRepeatCustomerButtonActive(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          repeatCustomerButtonActive == true
                            ? '#0e1437'
                            : '#564d2a',
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      SetAllButtonsFalse();
                      setTotalCustomerButtonActive(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          totalCustomerButtonActive == true
                            ? '#0e1437'
                            : '#564d2a',
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
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      SetAllButtonsFalse();
                      setExpensesButtonActive(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          expensesButtonActive == true ? '#0e1437' : '#564d2a',
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{width: '50%'}}
                    onPress={() => {
                      SetAllButtonsFalse();
                      setProfitabilityButtonActive(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor:
                          profitabilityButtonActive == true
                            ? '#0e1437'
                            : '#564d2a',
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
                  </TouchableOpacity>
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
