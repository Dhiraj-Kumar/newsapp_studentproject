const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },
    ans1:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('UserModel', UserSchema, 'Users');