/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Title } from "./src/composants/Title/index";
import Expression from './src/composants/Expression';
import Key from './src/composants/Key';
import KeyBoard from './src/composants/Keyboard';
import Calculatrice from './src/composants/Calculatrice';
import { reducers } from "./src/reducers/index";

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers);

export class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Calculatrice />
      </Provider>
    )
  }
}

export default App;
