import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PictureSelector from '../PictureSelector';

import { connect } from 'react-redux';

import { nouveau,reset } from '../../actions/index';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { onPressNew,onPressReset,...props } = this.props;

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 20,
                color: 'pink'
            }}>
                <Button
                onPress={()=>onPressNew()}
                    title="NEW"
                />
                <Button
                onPress={()=>onPressReset()}
                    title="RESET"
                />
            </View>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    onPressNew: () => dispatch(nouveau()),
    onPressReset: () => dispatch(reset()),
});

export default connect(null, mapDispatchToProps)(Footer);
