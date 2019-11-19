import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import Key from '../Key';

import { connect } from 'react-redux';
import { memoryRecall,memoryClear,memorySave } from '../../actions/index';


export class Memory extends React.Component {

    render() {
        let  {onKeyPressMS,onKeyPressMC,onKeyPressMR,disabled} = this.props;

        return (
            <View
                style={{
                    flexDirection: 'column'
                }}>
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderColor: 'black',
                            borderBottomWidth: 1,
                            borderTopWidth: 1,
                        }}>
                        <Key texte={"MS"} onPress={()=> onKeyPressMS()}></Key>
                        <Key texte={"MC"} onPress={()=> onKeyPressMC()} disabled={disabled}></Key>
                        <Key texte={"MR"} onPress={()=> onKeyPressMR()} disabled={disabled}></Key>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({ 
    disabled: state.memory != '' ? false : true,
});

const mapDispatchToProps = dispatch => ({
    onKeyPressMS: () => dispatch(memorySave()),
    onKeyPressMC: () => dispatch(memoryClear()),
    onKeyPressMR: () => dispatch(memoryRecall()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Memory);


// export default Memory;
