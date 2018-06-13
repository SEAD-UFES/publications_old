module.exports = app => {
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const mongoose = require('mongoose');
    const userModel = mongoose.model('User');

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        },
        function(req, email, password, done){
            userModel
                .findOne({email})
                .then(user => {
                    if(!user) return done(null, false, {message: 'Usuário não foi encontrado.'});
                    if(user.comparePassword(password, (err, isMatch) => {
                        if(!isMatch) return done(null, false, {message: 'Senha inválida.'});
                        return done(null, user, {message: 'Logado com sucesso.'});
                    }));
                }, err => done(err, null, {message: 'Erro interno do serviço de autenticação - passport.'}));
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
    
    passport.deserializeUser(function(id, cb) {
        userModel.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    app.use(passport.initialize());
}