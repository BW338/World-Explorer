import 'react-native-gesture-handler';
import * as React from 'react';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WorldExplorer from './screens/WorldExplorer';
import Settings from './screens/settings';
import { Foundation, Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.header}>
        <Image
          source={require('./assets/splash1.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Menu</Text>
      </LinearGradient>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default function App() {
  const [country, setCountry] = useState('Argentina');
  const [interval, setInterval] = useState(85000);
  const [ciudad, setCiudad] = useState(''); 

  // Abre el enlace en Maps
  const openMaps = (country, ciudad) => {
    console.log('Ciudad:', ciudad); // Agrega este console.log

    const url = `https://www.google.com/maps/search/?api=1&query=${ciudad},${country}`;
    Linking.openURL(url);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="WorldExplorer"
        drawerContent={(props) => <CustomDrawerContent {...props}  />}
        screenOptions={{
          drawerActiveTintColor: '#009688',
          drawerInactiveTintColor: '#000000',
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen 
          name="World Explorer"
          options={({ navigation }) => ({
            drawerLabel: 'World Explorer',
            drawerIcon: () => <Foundation name="map" size={24} color="grey" />,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  openMaps(country, ciudad); // Llamar a la función openMaps
                }}
              >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>Maps</Text>
              </TouchableOpacity>
            ),
          })}
        >
          {props => <WorldExplorer {...props} country={country} setCiudad={setCiudad} interval={interval} />}
        </Drawer.Screen>
        
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Settings',
            drawerIcon: () => <Feather name="settings" size={24} color="grey" />,
          }}
        >
          {props => <Settings {...props} country={country} setCountry={setCountry} interval={interval} setInterval={setInterval} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginTop: 10,
  },
});
