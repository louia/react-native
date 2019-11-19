import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

export class Key extends React.Component {

    render() {
        let { texte, disabled, operator, color, ...props } = this.props;

        let operatorKey;
        if (operator === true) {
            operatorKey = <TouchableOpacity
                {...this.props}
                key={'operationRow' + texte}
                style={{
                    backgroundColor: color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 25,
                    width: 50,
                    height: 50,
                    elevation : 15
                }}
                underlayColor={color}
                >
                <Text style={{
                    color: '#fff',
                    fontSize: 19,
                    fontWeight: 'bold',
                }}>{texte}</Text>
            </TouchableOpacity>;
        }


        return (
            operator ? operatorKey :
                <TouchableOpacity
                    // disabled ={disabled}
                    {...this.props}
                    activeOpacity={disabled ? 1 : 0.3}
                    key={texte}
                    underlayColor="#ededed"
                    style={{
                        flex: 1,
                        padding: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRightWidth: 1,
                        borderRightColor: '#ededed',
                    }}
                >
                    <Text
                        style={
                            {
                                color: disabled ? 'grey' : 'black',
                                fontSize: 15,
                                fontWeight: 'bold'
                            }
                        }
                    >{texte}</Text>
                </TouchableOpacity>
        );
    }
}




export default Key;
