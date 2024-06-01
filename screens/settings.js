import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function Settings({ country, setCountry, interval, setInterval }) {
  const [selectedCountry, setSelectedCountry] = React.useState(country);
  const [selectedInterval, setSelectedInterval] = React.useState(interval);

  const navigation = useNavigation();

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setCountry(value);
  };

  const handleIntervalChange = (value) => {
    setSelectedInterval(value);
    setInterval(value);
  };

  const handleDonePress = () => {
    // Navegar de vuelta a WorldExp.js
    navigation.navigate('World Explorer');
  };

  return (
  <ImageBackground source={require('../assets/bg-1.png')} style={styles.backgroundImage}> 
    <View style={styles.container}>
      <Text style={styles.title}>Select Country</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={handleCountryChange}
          style={styles.picker}
        >
          {/* Add your country options here */}
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Brazil" value="Brazil" />
          <Picker.Item label="Chile" value="Chile" />
          {/* ...other countries */}
        </Picker>
      </View>
      
      <Text style={styles.title}>Select Interval</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedInterval}
          onValueChange={handleIntervalChange}
          style={styles.picker}
        >
          {/* Add your interval options here */}
          <Picker.Item label="5s" value={5000} />
          <Picker.Item label="10s" value={10000} />
          <Picker.Item label="15s" value={15000} />
          {/* ...other intervals */}
        </Picker>
      </View>
    </View>
    <Button title="Done" onPress={handleDonePress} />
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(247, 247, 247, 0.2)', // Semi-transparent background to improve readability
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    marginVertical: 20,
  },
  picker: {
    height: 50,
    backgroundColor: '#e0e0e0',
  },
});
