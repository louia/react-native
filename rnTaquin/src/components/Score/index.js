import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import Modal from "react-native-modal";

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [],
      toggle: 0,
    };
  }

  async resetKey() {
    try {
      await AsyncStorage.removeItem('@Score:key');
      const value = await AsyncStorage.getItem('@Score:key');
      this.setState({
        score: [],
        toggle: 0,
      })
    } catch (error) {
      console.log("Error resetting data" + error);
    }
  }


  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@Score:key');
      if (value != null) {
        let tabScore = value.split("//");

        this.setState({
          score: tabScore,
        });
      }
      else console.log("rien");

    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  componentDidMount() {
    this.getKey()
  }

  renderRow(data) {
    return (
      <View style={styles.line}>
        <Text style={styles.container}>{data[0]}</Text>
        <Text style={styles.container}>{"[" + data[1] + "]"}</Text>
        <Text style={styles.container}>{"Play"}</Text>
      </View>
    );
  }

  render() {
    console.log(this.state.score);

    return (
      <View>
        <Modal
          testID={'modal'}
          isVisible={this.state.toggle ? 1 : 0}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Voulez vraiment supprimé tous les scores ?</Text>
            <View 
            style={{
              flexDirection : 'row',
              justifyContent : 'space-around'
            }}>
              <Button testID={'close-button'} onPress={this.resetKey.bind(this)} title="Oui" />
              <View style={{ margin: 10 }}></View>
              <Button testID={'close-button'} onPress={() => this.setState({
                toggle: 0
              })} title="Non" />
            </View>
          </View>
        </Modal>
        <Text style={styles.text}>Tableau des scores</Text>
        <Button
          onPress={() => this.setState({
            toggle: 1
          })}
          title="Supprimer"
        />
        <View style={{ margin: 10 }}></View>
        <View style={styles.KeyBoard}>
          <View style={styles.line}>
            <Text style={[styles.container, { backgroundColor: '#c9c9c9' }]}>{"Score"}</Text>
            <Text style={[styles.container, { backgroundColor: '#c9c9c9' }]}>{"Schema"}</Text>
            <Text style={[styles.container, { backgroundColor: '#c9c9c9' }]}>{"Action"}</Text>
          </View>
          {
            this.state.score.map((datum) => {
              if (datum != "null") {
                let i = datum.split("*");
                return this.renderRow(i);
              }
            })
          }
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
  },

  line: {
    flexDirection: 'row',
  },
  KeyBoard: {
    marginRight: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    fontSize: 17,
    textAlign: "center",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
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

export default Score;
