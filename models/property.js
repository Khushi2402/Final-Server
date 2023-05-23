const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('Property', propertySchema)