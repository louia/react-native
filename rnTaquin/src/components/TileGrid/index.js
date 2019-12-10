import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import Modal from "react-native-modal";


class TileGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tilesValues: ([1, 2, 3, 4, 5, 6, 7, 8, 0]),
      score: 0,
      win: false,
      tilesValuesAfterRandomize : []
    }
  }



  componentDidMount() {
    this.randomize();
  }

  componentDidUpdate(){
    if(this.props.isPressNew) {
      this.setState({
        tilesValues: ([1, 2, 3, 4, 5, 6, 7, 8, 0]),
        score: 0,
        win: false
      })
      this.randomize();
      this.props.isPressNewFinished()
    }

    if(this.props.isPressReset) {      
      this.setState({
        tilesValues: this.state.tilesValuesAfterRandomize,
        score: 0,
        win: false
      })
      this.props.isPressResetFinished()
    }
  }

  randomize() {
    let copyVal = JSON.parse(JSON.stringify(this.state.tilesValues));
    for (let i = 0; i <= 2; i++) {
      let cases = this.getCasesValides(copyVal);
      let index = Math.floor(Math.random() * cases.caseValides.length);
      let tempory = copyVal[cases.caseValides[index]];
      copyVal[cases.caseValides[index]] = copyVal[cases.posZero];
      copyVal[cases.posZero] = tempory;
    }
    this.setState({
      tilesValues: copyVal,
      tilesValuesAfterRandomize : copyVal
    });
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
    if (dataCases.caseValides.includes(tileNumber)) {
      let copyVal = JSON.parse(JSON.stringify(this.state.tilesValues));
      let tempory = copyVal[tileNumber];

      copyVal[tileNumber] = copyVal[dataCases.posZero];

      copyVal[dataCases.posZero] = tempory;
      this.setState((prevState, props) => ({
        tilesValues: copyVal,
        score: prevState.score + 1
      }));
      if (JSON.stringify(copyVal) == JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 0])) {
        this.setState({
          win: true
        })
      }
      return true;
    }
    return false;
  }

  toggleModal = () => {
    this.setState({ win: !this.state.win });
  };

  reset(){
    this.setState({
      tilesValues: ([1, 2, 3, 4, 5, 6, 7, 8, 0]),
      score: 0,
      win: false
    })
  }

  render() {
    return (
      <View>
        <Modal
          testID={'modal'}
          isVisible={this.state.win}
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
            <Text style={styles.contentTitle}>🎆 Tu as gagné ! 🎆</Text>
            <Button testID={'close-button'} onPress={this.toggleModal} title="Fermer" />
          </View>
        </Modal>
        <Text style={{
          textAlign: 'center'
        }}> score : {this.state.score} </Text>
        <View style={{
          margin: 0,
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
  sourcePicture: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
};
TileGrid.defaultProps = {
  dimension: 25
};

export default TileGrid;
