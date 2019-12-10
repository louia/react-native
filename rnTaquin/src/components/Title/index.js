import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Mon Taquin </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 20,
    margin: 20
  }
});

export default Title;
