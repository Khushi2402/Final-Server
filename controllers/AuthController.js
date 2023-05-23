const User =  require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    //encrypting the password we submitted
    bcrypt.hash(req.body.password, 10, function(err, hashedpass) {
        if(err) {
            res.json({
                error: err
            })
        }
        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedpass,
            isAgent: req.body.isAgent
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    User.findOne({$or: [{email:email},{password: password}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful',
                        token
                    })
                }
                else{
                    res.json({
                        message: 'Password does not match'
                    })
                }
            })
        }
        else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register, login
}