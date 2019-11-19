import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';


export class Expression extends React.Component {

    render() {
        let { expression,style, ...props } = this.props;

        return (
            <View style={{
                backgroundColor: '#6fccf5',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                padding : 20
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 38
                }}>{expression}</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({ 
    expression: state.expression,
});

export default connect(mapStateToProps)(Expression);


// export default Expression;
