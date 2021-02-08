/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screen/Home';
import Detail from './screen/Detail';
import WebView from './screen/WebView';
import QR from './screen/QR';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  MyDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator >
    );
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Drawer" component={this.MyDrawer} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="WebView" component={WebView} />
          <Stack.Screen name="QR" component={QR} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
