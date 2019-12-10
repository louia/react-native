import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class PictureSelector extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{
                margin : 5,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button 
            title="PICTURE SELECTOR"
          />
            </View>
        );
    }
}

export default PictureSelector;
