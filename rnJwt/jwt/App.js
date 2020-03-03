import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {AsyncStorage} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Accueil from './src/composants/Accueil';
import ContatcsList from './src/composants/ContatcsList';
import ContactItem from './src/composants/ContactItem';
import ContactEdit from './src/composants/ContactEdit';


const MainNavigator = createStackNavigator(
  {
    Accueil: {
      screen: Accueil,
    },
    ContactsList: {
      screen: ContatcsList,
    },
    ContactItem : {
      screen : ContactItem
    },
    ContactEdit : {
      screen : ContactEdit
    }
  },
  {
    initialRouteName: 'Accueil',
  }
);


const App = createAppContainer(MainNavigator);


export default App;
