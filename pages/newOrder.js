import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // Modal,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modal} from 'react-native-paper';
import {REACT_APP_BASE_URL} from '@env';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import axios from 'axios';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

export default function NewOrder({route, navigation}) {
  const [services, setServices] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [total, setTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      axios({
        method: 'GET',
        url: `${REACT_APP_BASE_URL}/getservice`,
      })
        .then(res => {
          setServices(res.data.services);
        })
        .catch(err => console.log(err));
    }, [shouldUpdate]),
  );

  const hideModal = () => {
    setModalVisible(false);
  };

  const postOrder = async () => {
    await axios({
      method: 'POST',
      url: `${REACT_APP_BASE_URL}/postorder`,
      data: {
        phone: phone,
        total: parseInt(total),
      },
    })
      .then(async res => {
        console.log(res);
        setShouldUpdate(!shouldUpdate);
        setPhone('');
        setModalVisible(false);
        setTotal(0);
        setDiscount(0);
        setDiscountedAmount(0);
        setNetTotal(0);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const calculateDiscount = discountText => {
    setDiscount(discountText);
    setDiscountedAmount((parseInt(discountText) / 100) * parseInt(total));
    var temp_discountedAmount =
      (parseInt(discountText) / 100) * parseInt(total);
    setNetTotal(parseInt(total) - temp_discountedAmount);
  };

  const calculateDiscountAmount = discountText => {
    setDiscountedAmount(discountText);
    setDiscount(parseInt(discountText / parseInt(total)) * 100);
    setNetTotal(parseInt(total) - discountText);
  };

  const containerStyle = {
    backgroundColor: '#eedfe0',
    padding: 20,
    width: '100%',
  };

  const renderItem = ({item}) => (
    <ServiceCard
      id={item._id}
      serviceName={item.name}
      servicePrice={item.price}
      setTotal={setTotal}
      total={total}
      discount={discount}
      setDiscountedAmount={setDiscountedAmount}
      setNetTotal={setNetTotal}
      discountedAmount={discountedAmount}
    />
  );

  return (
    <LinearGradient
      colors={['#fad00e', '#ffd40e']}
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

            <View
              style={{
                marginTop: 12,
                paddingHorizontal: 24,
                // zIndex: 10,
                height: PAGE_HEIGHT - 370,
              }}>
              <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                // extraData={selectedId}
              />
            </View>
            {/* EDIT MODAL */}

            <Modal
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visible={modalVisible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <KeyboardAwareScrollView>
                <SafeAreaView>
                  <TextInput
                    value={phone}
                    activeUnderlineColor={'red'}
                    onChangeText={text => {
                      setPhone(text);
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
                    placeholder="Phone Number"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      postOrder();
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
                    <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                      Save Order
                    </Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </KeyboardAwareScrollView>
            </Modal>
            {/* EDIT MODAL END */}
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
                <Text style={{color: '#141414', fontSize: 12}}>Sub Total</Text>{' '}
                : {total} PKR
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
                  style={[styles.feildText, {color: '#141414', fontSize: 12}]}>
                  Discount :{' '}
                </Text>
                <TextInput
                  onChangeText={text => {
                    calculateDiscount(text);
                  }}
                  value={discount}
                  keyboardType="numeric"
                  style={[{height: 18}]}
                  maxLength={2}
                  activeUnderlineColor={'red'}
                />
                <Text style={[styles.feildText, {fontSize: 12}]}>%</Text>
              </View>
            </View>

            <View style={styles.feildContainer}>
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
                  style={[styles.feildText, {color: '#141414', fontSize: 12}]}>
                  Discounted Amount :{' '}
                </Text>
                <TextInput
                  onChangeText={text => {
                    calculateDiscountAmount(text);
                  }}
                  keyboardType="numeric"
                  style={[{height: 18}]}
                  maxLength={5}
                  value={discountedAmount}
                  activeUnderlineColor={'red'}
                />
                <Text style={[styles.feildText, {fontSize: 12}]}>PKR</Text>
              </View>
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
                <Text style={{color: '#141414', fontSize: 12}}>Total</Text>:{' '}
                {netTotal}
                PKR
              </Text>
            </View>

            <View style={{paddingHorizontal: 24}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  backgroundColor: '#fad00e',
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
    zIndex: 99999999,
  },
  feildContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
