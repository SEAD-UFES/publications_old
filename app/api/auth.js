module.exports = app => {
    const mongoose = require('mongoose');
    const userModel = mongoose.model('User');
    const jwt = require('jsonwebtoken');
    const passport = require('passport');

    const api = {};
    const errorParser = app.helpers.errorParser;

    api.login = (req, res, next) => {
        passport.authenticate('local', function(err, user, message) {
            if(err) res.status(500).json(errorParser.parse('auth-1', err));
            else if(!user) res.status(404).json(errorParser.parse('auth-2', message));
            else{
                let token = jwt.sign({id: user._id}, app.get('jwt_secret'));
                res.status(200).json({userMessage: "Login success", token});
            }
        })(req, res, next);       
    }

    return api;
}