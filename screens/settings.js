import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Settings({ country, setCountry }) {
  const [selectedCountry, setSelectedCountry] = React.useState(country);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setCountry(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Country</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={handleCountryChange}
        style={styles.picker}
      >
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="Brazil" value="Brazil" />
        <Picker.Item label="Bolivia" value="Colombia" />
        <Picker.Item label="Chile" value="Chile" />
        <Picker.Item label="Colombia" value="Colombia" />
        <Picker.Item label="Uruguay" value="Uruguay" />
        <Picker.Item label="Peru" value="Peru" />
        <Picker.Item label="Ecuador" value="Ecuador" />
        <Picker.Item label="Guyana" value="Guyana" />
        <Picker.Item label="Surinam" value="Surinam" />
        <Picker.Item label="Panama" value="Panama" />
        <Picker.Item label="Costa Rica" value="Costa" />
        <Picker.Item label="Guatemala" value="Guatemala" />
        <Picker.Item label="Nicaragua" value="Nicaragua" />
        <Picker.Item label="Cuba" value="Cuba" />
        <Picker.Item label="Republica dominicana" value="Republica dominicana" />
        <Picker.Item label="Mexico" value="Mexico" />
        <Picker.Item label="Estados Unidos" value="United States" />
        <Picker.Item label="Canada" value="Mexico" />
        <Picker.Item label="Sudafrica" value="Sudafrica" />
        <Picker.Item label="Madagascar" value="Madagascar" />
        <Picker.Item label="Libia" value="Libia" />
        <Picker.Item label="Niger" value="Niger" />


      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
});