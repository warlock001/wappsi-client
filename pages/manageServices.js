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
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {REACT_APP_BASE_URL} from '@env';
import SidebarLayout from '../layouts/sidebarLayout';
import {Modal} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ManageServiceCard from '../components/manageServiceCard';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator} from 'react-native-paper';
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
} from '@react-navigation/native';
import {set} from 'date-fns';
export default function ManageServices({route, navigation}) {
  const [services, setServices] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [editServiceName, setEditServiceName] = useState('');
  const [editServicePrice, setEditServicePrice] = useState('');
  const [editServiceId, setEditServiceId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loaderModalVisible, setLoaderModalVisible] = useState(false);
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

  async function postNewService() {
    if (newServiceName && newServicePrice) {
      setLoaderModalVisible(true);
      await axios({
        method: 'POST',
        url: `${REACT_APP_BASE_URL}/postservice`,
        data: {
          name: newServiceName,
          price: newServicePrice,
        },
      })
        .then(async res => {
          console.log(res);
          setShouldUpdate(!shouldUpdate);
          setNewServiceName('');
          setNewServicePrice('');
          setLoaderModalVisible(false);
        })
        .catch(err => {
          console.log(err);
          setLoaderModalVisible(false);
        });
    } else {
      ToastAndroid.showWithGravity(
        `Feilds can't be empty`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }

  const updateService = async () => {
    await axios({
      method: 'PUT',
      url: `${REACT_APP_BASE_URL}/putservice?id=${editServiceId}`,
      data: {
        name: editServiceName,
        price: editServicePrice,
      },
    })
      .then(async res => {
        console.log(res);
        setShouldUpdate(!shouldUpdate);
        setEditServiceName('');
        setEditServicePrice('');
        setModalVisible(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderItem = ({item}) => (
    <ManageServiceCard
      id={item._id}
      serviceName={item.name}
      servicePrice={item.price}
      setEditServiceName={setEditServiceName}
      setEditServicePrice={setEditServicePrice}
      setEditServiceId={setEditServiceId}
      setShouldUpdate={setShouldUpdate}
      shouldUpdate={shouldUpdate}
      setModalVisible={setModalVisible}
    />
  );

  const hideModal = () => {
    setModalVisible(false);
  };

  const containerStyle = {
    backgroundColor: '#eedfe0',
    padding: 20,
    width: '100%',
  };

  const loderContainerStyle = {
    // backgroundColor: '#eedfe0',
    padding: 20,
    width: '100%',
  };

  return (
    <LinearGradient
      colors={['#fad00e', '#ffd40e']}
      style={styles.gradientStyle}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <KeyboardAwareScrollView>
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
                  Manage Services
                </Text>
              </View>

              <View
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                }}>
                <TextInput
                  value={newServiceName}
                  onChangeText={text => {
                    console.log(text);
                    setNewServiceName(text);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    width: '50%',
                    borderWidth: 1,
                    borderColor: '#fad00e',
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 5,
                  }}
                  placeholder="New Service Name"
                />

                <TextInput
                  value={newServicePrice}
                  keyboardType="numeric"
                  onChangeText={text => {
                    console.log(text);
                    setNewServicePrice(text);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    width: '25%',
                    borderWidth: 1,
                    borderColor: '#fad00e',
                    borderRadius: 15,
                    padding: 10,
                    marginHorizontal: 5,
                  }}
                  placeholder="Price"
                />

                <TouchableOpacity
                  onPress={() => {
                    postNewService();
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '25%',
                  }}>
                  <FontAwesomeIcon icon={faPlus} size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Edit Existing Services
                </Text>
              </View>
              <View
                style={{
                  // marginVertical: 12,
                  paddingHorizontal: 24,
                  zIndex: 10,
                  // height: PAGE_HEIGHT - 320,
                }}>
                <FlatList
                  data={services}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                  // extraData={selectedId}
                />
              </View>
            </SafeAreaView>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      {/* EDIT MODAL */}
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        visible={loaderModalVisible}
        // onDismiss={()=>}
        contentContainerStyle={loderContainerStyle}>
        <ActivityIndicator
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: PAGE_HEIGHT,
          }}
          animating={true}
        />
      </Modal>
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        visible={modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <TextInput
          value={editServiceName}
          onChangeText={text => {
            setEditServiceName(text);
          }}
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderWidth: 1,
            borderColor: '#fad00e',
            borderRadius: 15,
            padding: 10,
            marginHorizontal: 5,
            marginBottom: 15,
          }}
          placeholder="Service Name"
        />

        <TextInput
          value={editServicePrice}
          onChangeText={text => {
            setEditServicePrice(text);
          }}
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            borderWidth: 1,
            borderColor: '#fad00e',
            borderRadius: 15,
            padding: 10,
            marginHorizontal: 5,
            marginBottom: 15,
          }}
          placeholder="Price"
        />

        <TouchableOpacity
          onPress={() => {
            updateService();
          }}
          style={[
            {
              backgroundColor: '#fad00e',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 15,
            },
            styles.bottomContainer,
          ]}>
          <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </Modal>
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
