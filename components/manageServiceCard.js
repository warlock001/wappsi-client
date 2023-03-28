import {StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {Touchable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';

export default function ManageServiceCard(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(null);
  const [counter, setCounter] = useState(0);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  async function handleIncrement() {
    setCounter(counter + 1);
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faTrash} color={'#CF3339'} size={30} />
      </TouchableOpacity>
      <Text style={styles.serviceName}>{props.serviceName}</Text>

      <Text>PKR {props.servicePrice} </Text>

      <TouchableOpacity>
        <FontAwesomeIcon icon={faPenToSquare} color={'#CF3339'} size={30} />
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
