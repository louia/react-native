import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {AsyncStorage} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/components/HomeScreen/index';
import Informations from './src/components/Informations/index';


const MainNavigator = createStackNavigator(
  {
    Accueil: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Informations: {
      screen: Informations, 
      navigationOptions: {
        title : 'Informations'
      },
    },
  },
  {
    initialRouteName: 'Accueil',
  }
);



const App = createAppContainer(MainNavigator);


export default App;
