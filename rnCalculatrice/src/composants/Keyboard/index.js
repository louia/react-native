import React from 'react';
import {
    View
} from 'react-native';
import Key from '../Key';


import { connect } from 'react-redux';
import { addSymbol,clear,equal,clearAll } from '../../actions/index';

class KeyBoard extends React.Component {

    render() {
        let { texte, disabled, onKeyPress, onKeyPressClear,onKeyPressEqual,onKeyPressAllClear,...props } = this.props;

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: '#ededed',
                            borderBottomWidth: 1,
                        }}>
                        <Key texte={"7"} onPress={()=> onKeyPress("7")}></Key>
                        <Key texte={"8"} onPress={()=> onKeyPress("8")}></Key>
                        <Key texte={"9"} onPress={()=> onKeyPress("9")} ></Key>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: '#ededed',
                            borderBottomWidth: 1,
                        }}>
                        <Key texte={"4"} onPress={()=> onKeyPress("4")}></Key>
                        <Key texte={"5"} onPress={()=> onKeyPress("5")}></Key>
                        <Key texte={"6"} onPress={()=> onKeyPress("6")}></Key>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: '#ededed',
                            borderBottomWidth: 1,
                        }}>
                        <Key texte={"1"} onPress={()=> onKeyPress("1")}></Key>
                        <Key texte={"2"} onPress={()=> onKeyPress("2")}></Key>
                        <Key texte={"3"} onPress={()=> onKeyPress("3")}></Key>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: '#ededed',
                            borderBottomWidth: 1,
                        }}>
                        <Key texte={"0"} onPress={()=> onKeyPress("0")}></Key>
                        <Key texte={"AC"} onPress={()=> onKeyPressAllClear()}></Key>
                        <Key texte={"C"} onPress={()=> onKeyPressClear()}></Key>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            justifyContent: "space-around"
                        }}>
                        <Key texte={"%"} operator={true} onPress={()=> onKeyPress("%")} color={"#b16eb7"}></Key>
                        <Key texte={"/"} operator={true} onPress={()=> onKeyPress("/")} color={"#dc9c4c"}></Key>
                        <Key texte={"X"} operator={true} onPress={()=> onKeyPress("x")} color={"#e088be"}></Key>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: "space-around"
                        }}>
                        <Key texte={"-"} operator={true} onPress={()=> onKeyPress("-")} color={"#0984e3"}></Key>
                        <Key texte={"+"} operator={true} onPress={()=> onKeyPress("+")} color={"#d63031"}></Key>
                        <Key texte={"="} operator={true} onPress={()=> onKeyPressEqual()} color={"#fdcb6e"}></Key>
                    </View>
                </View>
            </View>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    onKeyPress: key => dispatch(addSymbol(key)),
    onKeyPressClear: () => dispatch(clear()),
    onKeyPressAllClear: () => dispatch(clearAll()),
    onKeyPressEqual: () => dispatch(equal()),
});

export default connect(null, mapDispatchToProps)(KeyBoard);

// export default KeyBoard;
