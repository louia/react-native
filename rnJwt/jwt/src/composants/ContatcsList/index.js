import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableHighlight
} from 'react-native';




export class ContatcsList extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
            <View
                style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableHighlight style={styles.text}>
                        <View>
                            <Image style={styles.image} source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/stevedesigner/128.jpg' }} />
                            <Text style={{
                                textAlign: 'center'
                            }}>Louis Chovaneck</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 16,
        backgroundColor: 'red',
        textAlign: 'center'
    },
    image:{
        width : 60,
        height : 60,
        justifyContent: 'center',
        padding : 20
    }
});

// const mapStateToProps = state => ({ 
//     disabled: state.ContatcsList != '' ? false : true,
// });

// const mapDispatchToProps = dispatch => ({
//     onKeyPressMS: () => dispatch(memorySave()),
//     onKeyPressMC: () => dispatch(memoryClear()),
//     onKeyPressMR: () => dispatch(memoryRecall()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContatcsList);


export default ContatcsList;
