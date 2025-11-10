let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Car = require('../models/car');

// Get route for the read car list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const CarList = await Car.find();
        //console.log(CarList);
        res.render('Cars/list',{
            title:'Cars',
            CarList:CarList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Cars/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the Add Page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Cars/add',{
            title:'Add a Car'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Cars/add',{
            error:'Error on server'
        })
    }
})
// Post route for processing the Add Page - Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newCar = Car({
            "make":req.body.make,
            "model":req.body.model,
            "mileage":req.body.mileage,
            "year":req.body.year,
            "price":req.body.price
        });
        Car.create(newCar).then(()=>{
            res.redirect('/cars')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Cars/add',{
            error:'Error on server'
        })
    }
})
// Get route for displaying the Edit Page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{

})
// Post route for processing the Edit Page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{

})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{

})
module.exports = router;