import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Tile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { tileSize, children, ...props } = this.props;
        return (
            children == '0' ?
            <View
            style={{
                width: tileSize,
                height: tileSize,
                borderWidth: 1,
                borderColor: 'black',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
        </View>
        :
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: tileSize,
                    height: tileSize,
                    borderWidth: 1,
                    borderColor: 'black',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: 'black',
                    }}
                >{children}</Text>
            </TouchableOpacity>
        );
    }
}
Tile.propTypes = {
    onPress: PropTypes.func,
};

export default Tile;
