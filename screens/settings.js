import React from 'react';
import { Button, View, Text, StyleSheet, useState } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Settings({ country, setCountry, interval, setInterval }) {
  const [selectedCountry, setSelectedCountry] = React.useState(country);
  const [selectedInterval, setSelectedInterval] = React.useState(interval);


  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setCountry(value);
  };

  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
    setInterval(value);

  };

  return (
 <View style={styles.container}>

  <View style={{flexDirection:'row', justifyContent:'space-around'}}>     
    {/* Selector de PAIS */}
     <View style={{flexDirection:'column', borderWidth:2 }}>  
      <Text style={styles.title}>Select Country</Text>
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={handleCountryChange}
        style={styles.picker}
      >
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="Brazil" value="Brazil" />
        <Picker.Item label="Bolivia" value="Bolivia" />
        <Picker.Item label="Chile" value="Chile" />
        <Picker.Item label="Colombia" value="Colombia" />
        <Picker.Item label="Uruguay" value="Uruguay" />
        <Picker.Item label="Peru" value="Peru" />
        <Picker.Item label="Ecuador" value="Ecuador" />
        <Picker.Item label="Guyana" value="Guyana" />
        <Picker.Item label="Surinam" value="Surinam" />
        <Picker.Item label="Panama" value="Panama" />
        <Picker.Item label="Costa Rica" value="Costa Rica" />
        <Picker.Item label="Guatemala" value="Guatemala" />
        <Picker.Item label="Nicaragua" value="Nicaragua" />
        <Picker.Item label="Cuba" value="Cuba" />
        <Picker.Item label="Republica dominicana" value="Republica dominicana" />
        <Picker.Item label="Mexico" value="Mexico" />
        <Picker.Item label="Estados Unidos" value="United States" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="Sudafrica" value="Sudafrica" />
        <Picker.Item label="Madagascar" value="Madagascar" />
        <Picker.Item label="Antartida" value="Antartic" />
        <Picker.Item label="Niger" value="Niger" />
      </Picker>
     </View> 
    </View>

    <View style={{flexDirection:'column', borderWidth:2,  }}>  
    {/* Selector de TIEMPO */}
      <Text style={styles.title}>Select Interval</Text>
      <Picker
        selectedValue={selectedInterval}
        onValueChange={handleIntervalChange}
        style={styles.picker}
      >
        <Picker.Item label="5s" value={5000} />
        <Picker.Item label="10s" value={10000} />
        <Picker.Item label="15s" value={15000} />
        <Picker.Item label="30s" value={30000} />
        <Picker.Item label="60s" value={60000} />
        <Picker.Item label="90s" value={90000} />
      </Picker>
    </View>  
  </View>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    minWidth: 100, // Ajusta este valor según sea necesario
  },
  picker: {
    flex: 1,
    height: 50,
  },
});
