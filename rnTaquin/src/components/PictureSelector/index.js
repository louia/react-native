import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { setImg } from '../../actions/index';

class PictureSelector extends Component {
    constructor(props) {
        super(props);
        options = {
            title: 'Selectionnez une image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
          };
    }

    render() {
        return (
            <View style={{
                margin : 5,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Button
            title={"PICTURE SELECTOR"} onPress={() => {
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
            
                // var img = [...this.state.images,source];
                // this.setState({
                //   images : img
                // })
                this.props.setImgProps(source);
              }
            });
          }}
          />
            </View>
        );
    }
}
const mapDispatchToProps = dispatch => ({
  setImgProps: img => dispatch(setImg(img)),
});


export default connect(null,mapDispatchToProps)(PictureSelector);
