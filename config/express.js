const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const settings = require('./settings.json');
const secrets = require('./secrets.json');

//Middlewares
app.use(express.static('./public'));
app.use(bodyParser.json());

//Load settings file
settings.forEach(conf => {
    app.set(conf.key, conf.value);
});

//Load secrets file
secrets.forEach(secret => {
    app.set(secret.key, secret.value);
});


consign({cwd: 'app'})
    .include('helpers')
    .then('models')
    .then('passport')
    .then('api')
    .then('routes')
    .into(app);

module.exports = app;