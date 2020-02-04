import * as Keychain from 'react-native-keychain';

export default async function login(login, password, navigate) {
    fetch("http://127.0.0.1:8000/auth/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "login": login,
            "password": password,
        })
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if (result.jwt) {
                    
                    Keychain.setGenericPassword('jwt', result.jwt).then((r) => {
                        // const navigation = this.props.navigation;
                        // navigate('ContactsList');
                        getContacts(result.jwt);
                    });
                }
                else {
                    Alert.alert("Connexion", "Identifiant Inccorect");

                }
            },
            (error) => {
                console.log(error);
            }
        )
}

export async function getContacts(jwt) {
    fetch("http://127.0.0.1:3000/api/contacts", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + jwt
        },
    })
        // .then(res => res.json())
        .then(
            (result) => {
                console.log(result);

            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
                console.log(error);

            }
        )
}

export { login };