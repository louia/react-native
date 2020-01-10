import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>About</Text>
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

export default About;
