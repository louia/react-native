const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const { port, debug } = require('./config');

const realPort = port && port > 1024 ? port : 8000;

database.sync();

const app = express();
app.use(cors());
app.use(bodyParser.json());

if (debug)
    app.use((req, res, next) => {
        console.log(`Request ${req.url} on local Server port ${realPort}`);
        console.log('header : ', req.headers);
        next();
    });

app.post('/auth/login', (req, res) => {
    database.authenticate(req, res);
});
app.post('/auth/signup', (req, res) => {
    database.register(req, res);
});
app.post('/auth/delete', (req, res) => {
    database.delete(req, res);
});
app.get('/auth/users', (req, res) => {
    database.listUsers(req, res);
});

app.listen(realPort, () => console.log(`Authentification server listening on port ${realPort}!`));
