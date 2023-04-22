import {StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {Touchable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {REACT_APP_BASE_URL} from '@env';
import {
  faPenToSquare,
  faStarOfDavid,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function ManageServiceCard(props) {
  const deleteService = async id => {
    await axios({
      method: 'DELETE',
      url: `${REACT_APP_BASE_URL}/deleteservice?id=${id}`,
    })
      .then(async res => {
        props.setShouldUpdate(!props.shouldUpdate);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => {
          deleteService(props.id);
        }}>
        <FontAwesomeIcon icon={faTrash} color={'#0e1437'} size={30} />
      </TouchableOpacity>
      <Text style={styles.serviceName}>{props.serviceName}</Text>

      <Text>PKR {props.servicePrice} </Text>

      <TouchableOpacity
        onPress={() => {
          props.setEditServiceName(props.serviceName);
          props.setEditServicePrice(props.servicePrice);
          props.setEditServiceId(props.id);
          props.setModalVisible(true);
        }}>
        <FontAwesomeIcon icon={faPenToSquare} color={'#0e1437'} size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  InputFieldStyle: {
    backgroundColor: '#FFF',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  counterBtn: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  serviceName: {
    width: 100,
  },
});
