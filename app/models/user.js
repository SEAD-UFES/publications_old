const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
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
        select: false
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
    }
});

mongoose.model('User', schema);