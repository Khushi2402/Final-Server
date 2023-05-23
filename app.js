const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('../Server/routes/users')
const propertyRouter = require('../Server/routes/properties')

const app = express()

app.use(express.json())

//connection
const url = 'mongodb://localhost:27017/UserDB'
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
.then(() => {
    console.log(`CONNECTED TO MONGO!`);
})
.catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
})

const con = mongoose.connection

con.on('open', () => {
    console.log('connected...') 
}) 

//User Route
app.use('/users', userRouter)
//Property Route
app.use('/property', propertyRouter)

app.listen(5050, () => {
    console.log('Server started')
})