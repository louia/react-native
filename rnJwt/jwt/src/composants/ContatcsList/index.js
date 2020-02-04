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
        navigation = props.navigation;
        this.state = {
            contacts: props.navigation.getParam('contacts')
        }
    }
    componentDidMount() {

        const {setParams} = this.props.navigation;
        setParams({
            myTitle:  this.props.navigation.getParam('username'),
            myOnPress : this.props.navigation
        });

        // this.navigation.setParams({
        //     myTitle: this.props.navigation.getParam('username'),
        //     myOnPress :  this.props.navigation
        // })
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        if (state.params != undefined) {
            return {
                headerLeft: null,
                title : state.params.myTitle,
                headerRight: () => <Button title={"logout"} onPress={()=>state.params.myOnPress.navigate('Accueil')}/>
            }
        }

    };

    // static navigationOptions = {
    //     headerLeft: null,
    //     headerRight: () => <Button title={"logout"} onPress={() => this.props.navigation.navigate('Accueil')} />
    // };

    render() {
        const navigation = this.props.navigation;
        return (
            <View
                style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {this.state.contacts.map((data) => (
                        <TouchableHighlight key={data.id} onPress={() => navigation.navigate('ContactItem', { id: data.id })}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey',
                                height: 60
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontWeight: 'bold'
                                }}>{data.lastName + ' ' + data.firstName}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
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
