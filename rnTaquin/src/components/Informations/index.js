import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import PropTypes from 'prop-types';
import Score from '../Score/index';
import About from '../About/index';

class Informations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //METTRE TABS
    return (
      <View>
        <Text>Coucou</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
});

const TabNavigator = createMaterialTopTabNavigator(
  {
    Score: Score,
    About: About,
  }
);


export default createAppContainer(TabNavigator);
