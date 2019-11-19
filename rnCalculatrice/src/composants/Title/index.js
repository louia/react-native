import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { setcolors } from '../../actions/index';

export class Title extends React.Component {

    render() {
        let { title, color,onTitlePress,expression, ...props } = this.props;
        return (
            <View>
                <TouchableHighlight
                    onPress={()=> onTitlePress()}
                    style={{
                        padding: 18,
                        backgroundColor: color,
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 25
                        }}>
                        {title}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = state => ({ 
    color: state.color,
});

const mapDispatchToProps = dispatch => ({
    onTitlePress: () => dispatch(setcolors()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Title);
