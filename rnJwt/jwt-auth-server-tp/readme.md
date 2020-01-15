# jwt-auth-server-tp
Serveur d'authentification avec génération de JSON Web Token et refresh token

Ce serveur utilise les projets express(serveur http) et sequelize(orm)

## installation
Téléchargez les fichiers du dépôt directement ou par clonage du dépôt git puis
installez les modules nécessaires avec la commande :
> npm install

Lancez le serveur en vous mettant dans le répertoire du projet et en tapant :
> node .

## Configuration
Le fichier config.js vous permet de configurer votre serveur :
 
 * **port** : integer, pour définir le port d'écoute du serveur > 1024. Défaut 8000.
 * **debug** : boolean, pour activer l'affichage de traces de fonctionnement
 * **secret** : string, clé de chiffrement pour la signature des jwt. Devra être le même sur le client/api.
 * **expireTime** : integer, délai de validité des jwt en secondes

## services
Tous les paramètres et les réponses des différentes requêtes sont exprimés en **JSON**.

### Authentification
Avec login / mot de passe ou bien refresh token
* route : **/auth/login**
* paramètres : { login, password } ou { refreshToken }
* réponses : 
   * status 200, { jwt, refreshToken } en cas de réussite
   * status 401, {error:  'wrongcredentials' | 'wrongrefresh' | 'nocredentials', message} en cas d'échec d'authentification
* Attention, contrairement à un fonctionnement traditionnel, chaque appel réussi à ce service créera un nouveau refreshToken.

### Ajout d'un nouvel utilisateur
* route : **/auth/signup**
* paramètres : { id, login, password }
* réponses :
    * status 200, { jwt, refreshToken } en cas de réussite
    * status 401, {error:  'userexist' | 'nocredentials', message} en cas d'échec

### Suppression d'un utilisateur
* route : **/auth/delete**
* paramètres : { login, password }
* réponses : 
    * status 200, { login } en cas de suppression réussie
    * status 401, {error:  'wrongcredentials' | 'nocredentials', message} en cas d'échec

### Liste des utilisateurs
* route **/auth/users**
* paramètres : aucun
* réponses :
    * status 200, tableau des utilisateurs 
avec utilisateur = { id, login, password, refresh, role, createdAt, updatedAt }

## Administration
Une page, simple, de gestion de type backoffice vous permettra de gérer les utilisateurs à l'aide des services listés ci-dessus.

Ouvrez le fichier **backoffice.html** dans un navigateur pour l'utiliser.

