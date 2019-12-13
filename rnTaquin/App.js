import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Taquin from './src/components/Taquin/index';
// import Title from './src/components/Title';


import { reducers } from "./src/reducers/index";

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducers);

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    return (
      <Provider store={store}>
      <Taquin />
      </Provider>
    );
  }
}

export default App;
