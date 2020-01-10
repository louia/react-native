import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Taquin from '../Taquin/index';

import { reducers } from "../../reducers/index";


import { Provider } from 'react-redux';
import { createStore } from 'redux';


const store = createStore(reducers);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Provider store={store}>
        <Taquin navigate={navigate} />
      </Provider>
    );
  }
}

export default HomeScreen;
