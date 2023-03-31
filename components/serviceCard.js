import {StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Switch} from 'react-native-paper';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ServiceCard(props) {
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
    props.setTotal(parseInt(props.total) + parseInt(props.servicePrice));
    var total_temp = parseInt(props.total) + parseInt(props.servicePrice);
    var total_discount =
      (parseInt(props.discount) / 100) *
      (parseInt(props.total) + parseInt(props.servicePrice));
    props.setDiscountedAmount(
      (parseInt(props.discount) / 100) *
        (parseInt(props.total) + parseInt(props.servicePrice)),
    );
    props.setNetTotal(total_temp - total_discount);
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.serviceName}>{props.serviceName}</Text>

      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#CF3339',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            height: 25,
            width: 25,
          }}
          elevated
          onPress={handleIncrement}>
          <Text style={styles.counterBtn}>+</Text>
        </TouchableOpacity>
        <Text style={{padding: 10}}>{counter}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#CF3339',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            height: 25,
            width: 25,
          }}
          elevated
          onPress={handleDecrement}>
          <Text style={styles.counterBtn}>-</Text>
        </TouchableOpacity>
      </View>

      <Text style={{paddingHorizontal: 3, width: '20%'}}>
        {props.servicePrice} PKR
      </Text>
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
