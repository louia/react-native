import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tile from '../Tile';

class TileGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesValues: ([1, 2, 3, 4, 5, 6, 7, 8, 0])
    }
  }

  componentDidMount() {
    this.randomize();
  }

  randomize() {
    let copyVal = JSON.parse(JSON.stringify(this.state.tilesValues));
    for (let i = 0; i <= 50; i++) {
      let cases = this.getCasesValides(copyVal);
      let index = Math.floor(Math.random() * cases.caseValides.length);
      let tempory = copyVal[cases.caseValides[index]];
      copyVal[cases.caseValides[index]] = copyVal[cases.posZero];
      copyVal[cases.posZero] = tempory;
    }
    this.setState(({
      tilesValues: copyVal,
    }));
  }

  getCasesValides(values = this.state.tilesValues) {
    let res = {
      posZero: 0,
      caseValides: [],
    };
    for (let i = 0; i <= 8; i++) {
      if (values[i] === 0) {
        res.posZero = i;
        if (i !== 2 && i !== 5 && i !== 8) res.caseValides.push(i + 1);
        if (i !== 0 && i !== 3 && i !== 6) res.caseValides.push(i - 1);
        if (i !== 0 && i !== 1 && i !== 2) res.caseValides.push(i - 3);
        if (i !== 6 && i !== 7 && i !== 8) res.caseValides.push(i + 3);
      }
    }
    return res;
  }


  tilePress(tileNumber) {
    let dataCases = this.getCasesValides();
    // console.log(dataCases, tileNumber);
    console.log(this.state.tilesValues);
    
    
    if (dataCases.caseValides.includes(tileNumber)) {
      let copyVal = JSON.parse(JSON.stringify(this.state.tilesValues));
      let tempory = copyVal[tileNumber];

      copyVal[tileNumber] = copyVal[dataCases.posZero];

      copyVal[dataCases.posZero] = tempory;
      this.setState({
        tilesValues: copyVal,
      });
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <Text style={{
          textAlign: 'center'
        }}> score : 42 </Text>
        <View style={{
          margin : 0,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
          height: this.props.dimension
        }}>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 0)}>
              {this.state.tilesValues[0]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 1)}>
              {this.state.tilesValues[1]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 2)}>
              {this.state.tilesValues[2]}
            </Tile>
          </View>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 3)}>
              {this.state.tilesValues[3]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 4)}>
              {this.state.tilesValues[4]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 5)}>
              {this.state.tilesValues[5]}
            </Tile>
          </View>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 6)}>
              {this.state.tilesValues[6]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 7)}>
              {this.state.tilesValues[7]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 8)}>
              {this.state.tilesValues[8]}
            </Tile>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    textAlign: 'center'
  },
  tileRow: {
    flexDirection: 'row',
  },
});

TileGrid.propTypes = {
  dimension: PropTypes.number,
};
TileGrid.defaultProps = {
  dimension: 25
};

export default TileGrid;
