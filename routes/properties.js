const express = require('express')
const router = express.Router()
const Property = require('../models/property.js')

router.get('/', async(req, res) => {
    try{
        const properties = await Property.find()
        res.json(properties)
    }
    catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const property = await Property.findById(req.params.id)
        res.json(property)
    }
    catch(err){
        res.send('Error  '+ err)
    }
})
router.post('/add', async(req, res) => {
    const property = await new Property({
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        size: req.body.size,
        description: req.body.description,
        image: req.body.image,
        favorite: req.body.favorite
    })

    try{
        const savedproperty = await property.save()
        res.json(savedproperty)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.patch('/:id', async(req, res) => {
    try{
        const property = await Property.findByIdAndDelete(req.params.id)
        property.name = req.body.name
        property.type = req.body.type
        property.address = req.body.address
        property.size = req.body.size
        property.description = req.body.description
        property.image = req.body.image
        property.favorite = req.body.favorite
        const savedproperty = await property.save()
        res.json(savedproperty)
    }
    catch(err){
        res.send('Error' + err)
    }
})

router.delete('/delete/:id', async(req, res) => {
    try{
        const property = await Property.findByIdAndDelete(req.params.id)
        res.json("Property Deleted Successfully!!")
    }
    catch(err){
        res.send('Error' + err)
    }
})

module.exports = router