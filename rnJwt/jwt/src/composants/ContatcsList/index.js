import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TouchableHighlight,
    Alert,
    Button
} from 'react-native';

export class ContatcsList extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigation;
    }

    
    static navigationOptions = {
        headerLeft: null,
        title: 'userName',
        headerRight:()=> <Button title={"logout"} onPress={()=>this.props.navigation.navigate('Accueil')}/>
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <View
                style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableHighlight onPress={() => navigation.navigate('ContactItem')}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            borderBottomWidth : 1,
                            borderBottomColor : 'grey',
                        }}>
                            <Image style={styles.image} source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/stevedesigner/128.jpg' }} />
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 25,
                                fontWeight: 'bold'
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
        // marginHorizontal: 20,
    },
    text: {
        fontSize: 16,
        backgroundColor: 'red',
        textAlign: 'center'
    },
    image: {
        width: 60,
        height: 60,
        alignItems: 'flex-start',
        margin: 10
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
