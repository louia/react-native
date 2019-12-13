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
    // this.on_press_new = this.on_press_new.bind(this);
    // this.on_press_newFinish = this.on_press_newFinish.bind(this);
    // this.on_press_reset = this.on_press_reset.bind(this);
    // this.on_press_resetFinish = this.on_press_resetFinish.bind(this);
    this.state = {
      dimension : 0,
      clickNew : false,
      clickReset : false,
    };
  }

  // on_press_new(){  
  //   this.setState({
  //     clickNew : true,
  //   })  
  // }

  // on_press_newFinish(){  
  //   this.setState({
  //     clickNew : false,
  //   })  
  // }

  // on_press_reset(){  
  //   this.setState({
  //     clickReset : true,
  //   })  
  // }

  // on_press_resetFinish(){  
  //   this.setState({
  //     clickReset : false,
  //   })  
  // }

  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    if (this.state.dimension == 0) {
      this.setState({
        dimension: width,
      })
    }
  }

  render() {
    return (
      <View onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
        <Title></Title>
        <TileGrid
          dimension={this.state.dimension}
          >
          </TileGrid>
        <PictureSelector></PictureSelector>
        <Footer></Footer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    
});

export default Taquin;
