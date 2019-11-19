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

import Title from "../Title/index";
import Expression from '../Expression';
import KeyBoard from '../Keyboard/index';
import Memory from '../Memory';

export class Calculatrice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Title title={"Ma calculatrice"}></Title>
        <Expression expression={"3*4+5/6"}></Expression>
        <Memory></Memory>
        <KeyBoard></KeyBoard>
      </View>
    )
  }
}

export default Calculatrice;
