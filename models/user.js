const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    isAgent: {
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps: true});
8
module.exports = mongoose.model('User', userSchema)

