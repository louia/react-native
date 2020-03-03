import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Button,
    Image,
    Linking,
    Platform
} from 'react-native';
import { getInfoContact } from '../../actions/authentification';
import * as Keychain from 'react-native-keychain';

import NumberFormat from 'react-number-format';


export class ContactItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: []
        }
    }

    componentDidMount() {
        const { setParams } = this.props.navigation;
        setParams({
            myTitle: this.props.navigation.getParam('username'),
            myOnPress: this.props.navigation
        });


        getInfoContact(this.props.navigation.getParam('jwt'), this.props.navigation.getParam('id')).then((res) => {
            this.setState({
                contact: res
            })
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        if (state.params != undefined) {
            return {
                title: state.params.myTitle,
                headerRight: () => <Button title={"logout"} onPress={async () => {
                    state.params.myOnPress.navigate('Accueil');
                    await Keychain.resetGenericPassword();
                }} />
            }
        }

    };

    makeCall = () => {

        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+this.state.contact.phone+'}';
        } else {
          phoneNumber = 'telprompt:${'+this.state.contact.phone+'}';
        }
    
        Linking.openURL(phoneNumber);
      };

    render() {
        // var NumberFormat = require('react-number-format');
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: this.state.contact.avatar }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{this.state.contact.firstName + ' ' + this.state.contact.lastName}</Text>
                        <Text style={styles.info}>{this.state.contact.email}</Text>
                        <NumberFormat value={this.state.contact.phone}
                            type='tel'
                            displayType={'text'} 
                            format="+## # ## ## ## ##"
                            renderText={(value) =>  <Text style={styles.description}>{value}</Text>}
                        />
                        {/* <Text style={styles.description}>{this.state.contact.phone}</Text> */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.makeCall} > 
                            <Text>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 210,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 90,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});

export default ContactItem;

