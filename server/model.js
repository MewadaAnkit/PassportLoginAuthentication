const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

const User = mongoose.model('users',UserSchema)
module.exports = User