const Sequelize = require('sequelize');
const KJUR = require('jsrsasign');
const { debug, secret, expireTime } = require('./config');

const database = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: './auth.sqlite',
    operatorsAliases: false,
});

const user = database.define('auth', {
    login: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
    refresh: Sequelize.STRING,
});

function generateRefreshToken(authUser) {
    let refresh = '' + authUser.id + KJUR.crypto.Util.getRandomHexOfNbytes(10);
    authUser.refresh = refresh;
    authUser.save();
    return refresh;
}

function getAccessToken(id, expireTime) {
    const expireDate = Date.now() + 1000 * expireTime;
    return KJUR.jws.JWS.sign(null, { alg: 'HS256' }, { sub: id, exp: expireDate }, secret);
}

function getTokens(authUser, duree) {
    let jwt = getAccessToken(authUser.id, duree || expireTime);
    const refreshToken = generateRefreshToken(authUser);
    return { jwt, refreshToken };
}

function logFromCrendential({ body, url }, res, onSuccess) {
    user.findOne({ where: { login: body.login, password: body.password } })
        .then(authUser => {
            if (!authUser) {
                if (debug) console.log(url + ' : wrong login or password');
                res.status(401).json({
                    error: 'wrongcredentials',
                    message: 'Wrong login or password',
                });
            } else onSuccess(authUser);
        })
        .catch(err => {
            if (debug) console.log(url + ' : ' + err.message);
            res.status(500).send({ error: '', message: err.message });
        });
}

function logFromRefreshToken({ body, url }, res) {
    user.findOne({ where: { refresh: body.refreshToken } })
        .then(authUser => {
            if (!authUser) {
                res.status(401).json({
                    error: 'wrongrefresh',
                    message: 'Wrong refreshToken',
                });
                if (debug) console.log(url + ' : wrong refreshToken');
            } else res.json(getTokens(authUser));
        })
        .catch(err => {
            if (debug) console.log(url + ' : ' + err.message);
            res.status(500).send({ error: '', message: err.message });
        });
}

const authDB = {
    authenticate: (req, res) => {
        let { body, url } = req;

        if (!body || (!(body.login && body.password) && !body.refreshToken)) {
            res.status(401).json({ error: 'nocredentials', message: 'Credentials requiered !' });
            if (debug) console.log(url + ' : Credentials requiered !');
            return;
        }

        if (body.password) {
            if (debug) console.log('Authenticate request with credentials : ', body);
            logFromCrendential(req, res, authUser => {
                res.json(getTokens(authUser, body.duree));
            });
        } else {
            if (debug) console.log('Authenticate request with refresh token : ', body);
            logFromRefreshToken(req, res);
        }
    },
    delete: (req, res) => {
        let { body, url } = req;

        if (debug) console.log('delete user request : ', body);

        if (!body || !body.login || !body.password) {
            res.status(401).json({ error: 'nocredentials', message: 'Credentials requiered !' });
            if (debug) console.log(url + ' : Credentials requiered !');
            return;
        }

        logFromCrendential(req, res, authUser => {
            authUser
                .destroy()
                .then(() => {
                    res.json({ login: authUser.login });
                })
                .catch(err => {
                    if (debug) console.log(url + ' : ' + err.message);
                    res.status(500).send({ error: '', message: err.message });
                });
        });
    },
    register: function({ body }, res) {
        if (debug) console.log('register user request : ', body);

        if (!body || !body.login || !body.password) {
            res.status(401).json({ error: 'nocredentials', message: "'login' or 'password' not found !" });
            return;
        }

        let { id, login, password } = body;
        user.create({ id, login, password })
            .then(authUser => {
                res.json(getTokens(authUser));
            })
            .catch(() => {
                res.status(401).json({ error: 'userexist', message: 'Error: User already exist' });
            });
    },
    sync: () => {
        user.sync({ force: false });
    },
    listUsers: (req, res) => {
        if (debug) console.log('list users request : ');

        user.findAll().then(users => {
            res.json(users);
        });
    },
};

module.exports = authDB;
