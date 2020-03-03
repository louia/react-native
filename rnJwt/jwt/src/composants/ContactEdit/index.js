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
    TextInput,
    Platform
} from 'react-native';
import { getInfoContact, updateInfoContact, getContacts } from '../../actions/authentification';
import * as Keychain from 'react-native-keychain';

import NumberFormat from 'react-number-format';


export class ContactEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: []
        }
    }

    componentDidMount() {
        this.setState({
            contact: this.props.navigation.getParam('contact')
        })
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

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Editer le contact</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.item}>Nom</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, }}
                                value={this.state.contact.lastName}
                                onChangeText={text => {
                                    var contactt = this.state.contact;
                                    contactt.lastName = text;
                                    this.setState({
                                        contact : contactt
                                    })
                                }}
                            />
                            <Text style={styles.item} >Prénom</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, }}
                                value={this.state.contact.firstName}
                                onChangeText={text => {
                                    var contactt = this.state.contact;
                                    contactt.firstName = text;
                                    this.setState({
                                        contact : contactt
                                    })
                                }}
                            />
                            <Text style={styles.item}>Email</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, }}
                                value={this.state.contact.email}
                                onChangeText={text => {
                                    var contactt = this.state.contact;
                                    contactt.email = text;
                                    this.setState({
                                        contact : contactt
                                    })
                                }}
                            /><Text style={styles.item} >Numéro de téléphone</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, }}
                                value={this.state.contact.phone}
                                onChangeText={text => {
                                    var contactt = this.state.contact;
                                    contactt.phone = text;
                                    this.setState({
                                        contact : contactt
                                    })
                                }}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
                                // console.log(this.state.contact);
                                updateInfoContact(this.props.navigation.getParam('jwt'),this.state.contact).then((res)=>{
                                    getContacts(this.props.navigation.getParam('jwt')).then((res)=>{
                                        console.log(res);
                                        
                                        this.props.navigation.navigate('ContactsList', { jwt: this.props.navigation.getParam('jwt'), contacts: res, username: this.state.email })
                                    });
                                });
                            }} >
                                <Text>Modifer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 150,
    },
    item: {
        fontSize: 16,
        marginTop: 13
    },
    title: {
        fontSize: 30,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: "center"
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
        marginTop: 0,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 3,
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

export default ContactEdit;

