import * as React from 'react';
import { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WorldExplorer from './screens/WorldExplorer';
import Settings from './screens/settings';
import { Foundation, Feather } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet } from 'react-native'; // Importa los componentes necesarios

const Drawer = createDrawerNavigator();

export default function App() {
  const [country, setCountry] = useState('Argentina');

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
     
       
        screenOptions={{
          drawerStyle:{
            backgroundColor:'#f5fffa',
            width:300,
            borderWidth:3,
            borderBottomRightRadius:20,
            borderTopRightRadius:20,
            fontSize:60,
          },
          drawerLabelStyle:{
            fontSize: 18 
          },
          headerStyle:{
            backgroundColor:'#f0ffff',
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            height:65,
          },
          headerTitleStyle:{
            fontSize:22,
            fontWeight:'300'
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
