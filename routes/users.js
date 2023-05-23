const express = require('express')
const Cryptojs = require("crypto-js")
const router = express.Router()
const User = require('../models/user.js')
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch(err){
        res.send('Error  '+ err)
    }
})

router.post('/add', async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: Cryptojs.AES.encrypt(req.body.password, 'secret key 123'),
        location: req.body.location
    })

    try{
        const a1 = await user.save()
        res.json(a1)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.patch('/update/:id',async(req,res)=> {
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        user.name = req.body.name
        user.email = req.body.email
        user.phone = req.body.phone
        user.password = req.body.password
        user.location = req.body.location
        const a1 = await user.save()
        res.json(a1)   
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.delete('/delete/:id',async(req,res)=> {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.json("USer Deleted Successfully !!")
    }
    catch(err){
        res.send('Error' + err)
    }
})

module.exports = router