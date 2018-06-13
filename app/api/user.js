module.exports = app => {
    const mongoose = require('mongoose');
    const userModel = mongoose.model('User');

    const errorParser = app.helpers.errorParser;
    
    const api = {};

    api.create = (req, res) => {
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) res.status(400).json(errorParser.parse('users-1', {}));
        else {
            userModel
                .create(req.body)
                .then(user => {
                    user.link = {
                        rel: 'self',
                        href: app.get('userApiUri') + '/' + user._id
                    }
                    user.save();
                    user = user.toObject();
                    delete user.password;
                    res.status(201).json({
                        userMessage: "Usuário criado com sucesso",
                        user
                    });
                }, error => {
                    console.log(error);
                });
        }
    }

    api.list = (req, res) => {
        console.log('Teste 2');
    }

    api.me = (req, res) => {
        
    }

    return api;
}