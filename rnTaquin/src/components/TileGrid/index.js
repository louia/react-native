import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import Modal from "react-native-modal";


import { connect } from 'react-redux';
import { setTileValues,setTileValuesAfterRand,setScore,setWin,nouveau } from '../../actions/index';
import {AsyncStorage} from 'react-native';


class TileGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourcePicture : ''
    };
  }

  componentDidMount() {
    this.randomize();
    
    if(this.state.sourcePicture != this.props.img){
      this.setState({
        sourcePicture : this.props.img
      })
    }
  }

  componentDidUpdate(){    
    if(this.props.random && JSON.stringify(this.props.tilesValue) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])){
      this.randomize();
    }
    if(this.state.sourcePicture != this.props.img){
      this.setState({
        sourcePicture : this.props.img
      })
    }
  }

  randomize() {
    let copyVal = JSON.parse(JSON.stringify(this.props.tilesValue));
    for (let i = 0; i <= 2; i++) {
      let cases = this.getCasesValides(copyVal);
      let index = Math.floor(Math.random() * cases.caseValides.length);
      let tempory = copyVal[cases.caseValides[index]];
      copyVal[cases.caseValides[index]] = copyVal[cases.posZero];
      copyVal[cases.posZero] = tempory;
    }
    this.props.setTilesValuesProps(copyVal);
    this.props.setTileValuesAfterRandProps(copyVal);
  }

  getCasesValides(values = this.props.tilesValue) {
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
  
  async saveKey(value) {
    const lastValue = await AsyncStorage.getItem('@Score:key');
    try {
      await AsyncStorage.setItem('@Score:key', value + lastValue);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }


  tilePress(tileNumber) {        
    let dataCases = this.getCasesValides();
    if (dataCases.caseValides.includes(tileNumber)) {
      let copyVal = JSON.parse(JSON.stringify(this.props.tilesValue));
      let tempory = copyVal[tileNumber];

      copyVal[tileNumber] = copyVal[dataCases.posZero];

      copyVal[dataCases.posZero] = tempory;

      this.props.setScoreProps(this.props.score + 1);
      console.log("score : " + this.props.score);
      
      this.props.setTilesValuesProps(copyVal);

      if (JSON.stringify(copyVal) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])) {
        this.saveKey(this.props.score +1  + '*' + this.props.tilesValuesAfterRandomize + '//');
        this.props.setWinProps(true);//WIN
      }
      return true;
    }
    return false;
  }

  toggleModal = () => {
    // this.setState({ win: !this.props.win });
    this.props.setWinProps(!this.props.win);
    this.props.onPressNew();
  };


  render() {
    return (
      <View>
        <Modal
          testID={'modal'}
          isVisible={this.props.win ? 1 : 0}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Victoire !</Text>
            <Text style={styles.contentTitle}>🎆 Tu as gagné en {this.props.score} coups ! 🎆</Text>
            <Button testID={'close-button'} onPress={this.toggleModal} title="Fermer" />
          </View>
        </Modal>
        <Text style={{
          textAlign: 'center'
        }}> score : {this.props.score} </Text>
        <View style={{
          margin: 0,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
          height: this.props.dimension
        }}>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 0)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[0]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 1)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[1]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 2)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[2]}
            </Tile>
          </View>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 3)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[3]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 4)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[4]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 5)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[5]}
            </Tile>
          </View>
          <View style={styles.tileRow}>
            <Tile tileSize={this.props.dimension / 3} sourcePicture={this.state.sourcePicture} onPress={this.tilePress.bind(this, 6)}>
              {this.props.tilesValue[6]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 7)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[7]}
            </Tile>
            <Tile tileSize={this.props.dimension / 3} onPress={this.tilePress.bind(this, 8)} sourcePicture={this.state.sourcePicture}>
              {this.props.tilesValue[8]}
            </Tile>
          </View>
        </View>
      </View >
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

TileGrid.propTypes = {
  dimension: PropTypes.number,
  // sourcePicture: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
TileGrid.defaultProps = {
  dimension: 25
};

const mapStateToProps = state => ({ 
  score: state.score,
  tilesValue: state.tilesValue,
  tilesValuesAfterRandomize : state.tilesValuesAfterRandomize,
  win : state.win,
  random : state.random,
  img : state.img
});


const mapDispatchToProps = dispatch => ({
  setTilesValuesProps: tilesValues => dispatch(setTileValues(tilesValues)),
  setTileValuesAfterRandProps: tileValuesAfterRand => dispatch(setTileValuesAfterRand(tileValuesAfterRand)),
  setScoreProps : score => dispatch(setScore(score)),
  setWinProps : win => dispatch(setWin(win)),
  onPressNew: () => dispatch(nouveau()),
});


export default connect(mapStateToProps,mapDispatchToProps)(TileGrid);
