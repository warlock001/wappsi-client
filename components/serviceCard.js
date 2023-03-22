import {StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Switch} from 'react-native-paper';

export default function ServiceCard(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(null);
  const [counter, setCounter] = useState(1);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleDecrement = () => setCounter(counter - 1);

  async function handleIncrement() {
    console.log('hello');
    setCounter(counter + 1);
  }

  // async function handleDecrement() {
  //   setCounter(counter - 1);
  // }

  return (
    <View style={styles.cardContainer}>
      <Switch
        color="#CF3339"
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />
      <Text style={styles.serviceName}>{props.serviceName}</Text>

      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Button elevated onPress={handleIncrement}>
          <Text style={styles.counterBtn}>+</Text>
        </Button>
        <Text>{counter}</Text>
        <Button elevated onPress={handleDecrement}>
          <Text style={styles.counterBtn}>-</Text>
        </Button>
      </View>

      <Text>{props.servicePrice} PKR</Text>
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
    // justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  counterBtn: {
    fontSize: 18,
    color: '#CF3339',
  },
  serviceName: {
    width: 100,
    textAlign: 'center',
  },
});
