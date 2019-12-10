import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class Tile extends Component {
    constructor(props) {
        super(props);
    }

    getSize(childrenNumber) {
        switch (childrenNumber) {
            case 1:
                return {
                    top: 0,
                    left: 0,
                };
            case 2:
                return {
                    top: 0,
                    left: -this.props.tileSize,
                };
            case 3:
                return {
                    top: 0,
                    left: -this.props.tileSize * 2,
                };
            case 4:
                return {
                    top: -this.props.tileSize,
                    left: 0,
                };
            case 5:
                return {
                    top: -this.props.tileSize,
                    left: -this.props.tileSize,
                };
            case 6:
                return {
                    top: -this.props.tileSize,
                    left: -this.props.tileSize * 2,
                };
            case 7:
                return {
                    top: -this.props.tileSize * 2,
                    left: 0,
                };
            case 8:
                return {
                    top: -this.props.tileSize * 2,
                    left: -this.props.tileSize,
                };
            default:
                return {
                    top: -this.props.tileSize * 2,
                    left: -this.props.tileSize * 2,
                };
        }
    }

    render() {
        let { tileSize, children, sourcePicture, ...props } = this.props;
        let offset = this.getSize(this.props.children);

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: tileSize,
                    height: tileSize,
                }}
            >

                <View
                    style={{
                        overflow: 'hidden',
                        width: tileSize,
                        height: tileSize,
                    }}
                >
                    <Image
                        source={{ uri: 'https://bieropolis.com/272-tm_large_default/biere-du-comte-n1-la-blonde-bio-du-mercantour.jpg' }}
                        style={{
                            width: tileSize * 3,
                            height: tileSize * 3,
                            position: 'absolute',
                            top: offset.top,
                            left: offset.left,
                            opacity: this.props.children !== 0 ? 1 : 0.3,
                        }}></Image>
                    {children != 0 ? <Text
                        style={{
                            color: 'black',
                        }}
                    >{children}</Text> : null}
                </View>
            </TouchableOpacity>
        );
    }
}
Tile.propTypes = {
    onPress: PropTypes.func,
};

export default Tile;
