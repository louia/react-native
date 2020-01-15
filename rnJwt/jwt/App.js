import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {AsyncStorage} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Accueil from './src/composants/Accueil';
import ContatcsList from './src/composants/ContatcsList';


const MainNavigator = createStackNavigator(
  {
    Accueil: {
      screen: Accueil,
    },
    ContactsList: {
      screen: ContatcsList, 
      navigationOptions: {
        headerLeft: null,
        title : 'userName',
        headerRight : <Button title={"logout"}></Button>
      },
    },
  },
  {
    initialRouteName: 'ContactsList',
  }
);


const App = createAppContainer(MainNavigator);


export default App;
