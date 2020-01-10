import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

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
        <Button
        title="En voir plus"
        onPress={() => this.props.navigate('Informations')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 15,
    margin: 15
  }
});

export default Title;
