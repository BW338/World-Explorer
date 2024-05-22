import * as React from 'react';
import { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WorldExplorer from './screens/WorldExplorer';
import Settings from './screens/settings';
import { Foundation, Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  const [country, setCountry] = useState('Argentina');

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="WorldExplorer"
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            {/* Encabezado */}
            <View style={styles.header}>
              <Image
                source={require('./assets/splash1.png')}
                style={styles.image}
              />
              <Text style={styles.title}>Menu</Text>
            </View>
            {/* Opciones del Drawer */}
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </View>
        )}
        drawerContentOptions={{
          activeTintColor: '#009688',
          inactiveTintColor: '#000000',
          labelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen 
          name="World Explorer"
          options={{
            drawerLabel:'World Explorer',
            title:'World Explorer',
            drawerIcon: ()=>(
              <Foundation name="map" size={24} color="grey" />
            ),
          }}
        >
          {props => <WorldExplorer {...props} country={country} />}
        </Drawer.Screen>

        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel:'Settings',
            title:'Settings',
            drawerIcon: ()=>(
              <Feather name="settings" size={24} color="grey" />
            ),
          }}
        >
          {props => <Settings {...props} country={country} setCountry={setCountry} />}
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
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
