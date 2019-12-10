import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Title from '../Title';
import TileGrid from '../TileGrid';
import PictureSelector from '../PictureSelector';
import Footer from '../Footer';

class Taquin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension : 0
    };
  }

  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    if (this.state.dimension == 0) {
      this.setState(({
        dimension: width,
      }))
    }
  }

  render() {
    return (
      <View onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
        <Title></Title>
        <TileGrid dimension={this.state.dimension}></TileGrid>
        <PictureSelector></PictureSelector>
        <Footer></Footer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    
});

export default Taquin;
