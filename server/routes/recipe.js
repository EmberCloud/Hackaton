const express = require('express');
const Dish = require('../models/dish');
const Router = express.Router();
const MongoClient = require('mongodb').MongoClient;


Router.post('/add', (req, res) => {

    console.log(req.body);
    console.log("asd");

    let newDish = new Dish({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription || "",
        imageUrl: req.body.imageUrl || "",
        constituents: req.body.constituents,
        foodIntake: req.body.foodIntake || "",
        exceptions: req.body.exceptions || "",
        rating: 0
    });

    newDish.save(function(err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
    });
});

Router.get('/posts/:num', (req, res) => {

    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        if(err) return console.log(err);

        const pageSize = 10;

        let collection = db.collection('dishes');

        let cursor = collection.find().skip(pageSize * (req.params.num - 1))
                           .limit(pageSize).stream();

        let items = [];
        cursor.on('data', item => {
            items.push(item);
        });
        cursor.on('end', () => {
            console.log(items);
            res.json({ success: true, msg: items });
        });
    });
});

Router.get('/filter/:filter/period/:period/posts/:num', (req, res) => {

    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        const pageSize = 10;

        let findRequest = {};
        switch(req.params.filter) {
            case 'Meat': findRequest['exceptions'] = req.params.filter; break;
            case 'Milk': findRequest['exceptions'] = req.params.filter; break;
            case 'Sugar': findRequest['exceptions'] = req.params.filter; break;
        }

        switch(req.params.period) {
            case 'Evening': findRequest['foodIntake'] = req.params.period; break;
            case 'Dinner': findRequest['foodIntake'] = req.params.period; break;
            case 'Supper': findRequest['foodIntake'] = req.params.period; break;
        }

        let collection = db.collection('dishes');

        let cursor = collection.find(findRequest)
                           .skip(pageSize * (req.params.num - 1))
                           .limit(pageSize).stream();

        let items = [];
        cursor.on('data', item => {
            items.push(item);
        });
        cursor.on('end', () => {
            console.log(items);
            res.json({ success: true, msg: items });
        });
    });

});

Router.get('/id/:id', function(req, res) {
    
    Dish.findOne({
            _id: req.params.id
        }, function(err, dish) {
            
            if (err) throw err;
        
            if (dish) {
                res.send(dish);
            } else {
                res.send('No dish');
            }
    });
}); 






module.exports = Router;