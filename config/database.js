module.exports = (uri) => {
    var mongoose = require('mongoose');

    mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://' + uri);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.log('Connection error: ' + error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(()=>{
            console.log('Connection closed from application close.');
            process.exit(0);
        });
    });
}