import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PictureSelector from '../PictureSelector';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 20,
                color: 'pink'
            }}>
                <Button
                    title="NEW"
                />
                <Button
                    title="RESET"
                />
            </View>
        );
    }
}

export default Footer;
