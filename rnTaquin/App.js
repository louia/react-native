import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Taquin from './src/components/Taquin/index';
// import Title from './src/components/Title';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    return (
      <View>
        <Taquin></Taquin>
      </View>
    );
  }
}

export default App;
