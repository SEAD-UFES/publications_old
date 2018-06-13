const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    surname: {
        type: String,
        require: false,
        trim: false
    },
    cpf: {
        type: String,
        require: false,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        select: true
    },
    link: {
        rel: {
            type: String,
            trim: true
        },
        href: {
            type: String,
            trim: true
        }
    },
    ufesProvider: {
        loginUnico: {
            type: String,
            trim: true
        }
    }
});

schema.pre('save', function(next) {
    let user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(app.get('hash_salt'), function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

mongoose.model('User', schema);