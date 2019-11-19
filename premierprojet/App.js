/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StatusBar
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';


export class App extends React.Component {
  
  constructor(props) {
    super(props)
    options = {
      title: 'Selectionnez une image',
      storageOptions: {
          skipBackup: true,
          path: 'images',
      },
    };
    modes = ['cover', 'stretch', 'contain', 'center','repeat'];
    this.state = {
      cycle: ['constructor'],
      dimension: 0.0,
      nbModes : 0,
      nbImage : 0,
      images : [
        require('./img1.jpg'),
        require('./img/android.png'),
        require('./img/biere.png'),
        require('./img/cinema.jpeg'),
        require('./img/maison.jpeg'),
        require('./img/paysage.jpeg')
      ]
    }
  }
  

  componentDidMount() {
    this.setState(prevState => ({
      cycle: [...prevState.cycle, ' DidMount '],
    }))
  }

  componentDidUpdate() {
    if (!this.state.cycle.includes('DidUpdate')) {
      this.setState(prevState => ({
        cycle: [...prevState.cycle, 'DidUpdate']
      }))
    }
  }
  onLayout(event) {

    if (!this.state.cycle.includes('OnLayout')) {
      this.setState(prevState => ({
        cycle: [...prevState.cycle, ' OnLayout : ']
      }))
    }
  }

  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    if (this.state.dimension == 0) {
      this.setState(({
        dimension: width,
      }))
    }
  }

  _onClick(){
    let nb = this.state.nbModes;
    nb===modes.length-1 ? nb=0 : nb++
    this.setState({
      nbModes: nb
    })
  }

  _onClickImages(){
    let nb = this.state.nbImage;
    nb===this.state.images.length-1 ? nb=0 : nb++
    this.setState({
      nbImage: nb
    })
  }


  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            padding: 15,
            backgroundColor: 'grey',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20
            }}
          >Mon Application</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
            style={{
              margin : 15,
              height: this.state.dimension,
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: 'black',
            }}
          >
            <Image style={{
              width: this.state.dimension, 
              height: this.state.dimension,
              resizeMode : modes[this.state.nbModes]
              }} source={this.state.images[this.state.nbImage]} />

            {/* <Text
              style={{
                textAlign: 'center',
                fontSize: 17
              }}
            >Dimension : {this.state.dimension}</Text> */}
          </View>
          <Text style={{
                textAlign: 'center',
              }}>resizeMode : {modes[this.state.nbModes]}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding : 20,
          color : 'pink'
        }}>
          <Button
            title="modes" onPress={() => this._onClick()}
          />
          <Button onPress={() => this._onClickImages()}
            title="images"
          />
          <Button onPress={() => {
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);
            
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                var img = [...this.state.images,source];
                this.setState({
                  images : img
                })
              }
            });
          }}
            title="Choose img"
          />
        </View>
      </View>
    )
  }
}

export default App;
