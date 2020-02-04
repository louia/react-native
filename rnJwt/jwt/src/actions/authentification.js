import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';

export default async function login(login, password) {
    return fetch("http://127.0.0.1:8000/auth/login", {
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
                    
                     return Keychain.setGenericPassword('jwt', result.jwt).then((r) => {                      
                       var res = getContacts(result.jwt);
                       return res;                       
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
    return fetch("http://127.0.0.1:3000/api/contacts", {
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result);
                return result;
// navigate('ContactsList');
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