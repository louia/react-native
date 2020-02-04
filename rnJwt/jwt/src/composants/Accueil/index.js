import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import login, { getContacts } from '../../actions/authentification';



// import { connect } from 'react-redux';
// import { addSymbol,clear,equal,clearAll } from '../../actions/index';

class Accueil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      contacts: []
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  onPress() {
    login(this.state.email, this.state.password, this.props.navigation.navigate).then((res) => {
      if (res != undefined) {
        this.setState({
          contacts: res
        })
        this.props.navigation.navigate('ContactsList', { contacts : this.state.contacts, username : this.state.email })
      }
    });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="pseudo"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="mot de passe"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onPress.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
// const mapDispatchToProps = dispatch => ({
//     onKeyPress: key => dispatch(addSymbol(key)),
//     onKeyPressClear: () => dispatch(clear()),
//     onKeyPressAllClear: () => dispatch(clearAll()),
//     onKeyPressEqual: () => dispatch(equal()),
// });

// export default connect(null, mapDispatchToProps)(Accueil);

export default Accueil;
