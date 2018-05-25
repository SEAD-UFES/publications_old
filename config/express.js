const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const settings = require('./settings.json');

//Middlewares
app.use(express.static('./public'));
app.use(bodyParser.json());

//Load settings file
settings.forEach(conf => {
    app.set(conf.key, conf.value);
});

consign({cwd: 'app'})
    .include('helpers')
    .then('models')
    .then('api')
    .then('routes')
    .into(app);

module.exports = app;