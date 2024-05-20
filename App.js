import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import WorldExplorer from './screens/WorldExplorer'
import Settings from './screens/settings';
import { Foundation, Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Home"
      screenOptions={{
        drawerStyle:{
          backgroundColor:'#f0f8ff',
          width:300,
        },
        headerStyle:{
          backgroundColor:'#f0ffff',
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
          height:80,
        },
        headerTitleStyle:{
          fontWeight:'300'
        },
      }}
      >
        <Drawer.Screen 
        name="World Explorer"
        component={WorldExplorer}
        options={{
          drawerLabel:'World Explorer',
          title:'World Explorer',
          drawerIcon: ()=>(
            <Foundation name="map" size={24} color="grey" />
          ),
        }} />

        <Drawer.Screen
         name="Settings" 
         component={Settings}
         options={{
          drawerLabel:'Settings',
          title:'Settings',
          drawerIcon: ()=>(
            <Feather name="settings" size={24} color="grey" />
          ),
        }} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
