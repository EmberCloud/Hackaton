const express = require('express');
const Dish = require('../models/dish');
const Router = express.Router();
const MongoClient = require('mongodb').MongoClient;


Router.post('/add', (req, res) => {

    console.log(req.body);
    console.log("asd");

    let constituents = [];
    for(let cons in req.body.constituents){
        constituents.push(+cons);
    }

    let newDish = new Dish({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription || "",
        imageUrl: req.body.imageUrl || "",
        kkal: +req.body.kkal || 0,
        foodIntake: req.body.foodIntake || "",
        exceptions: req.body.exceptions || [],
        rating: 0
    });

    newDish.save(function(err) {
        if (err) {
            console.log("error!!!!!");
            res.send({success: false, msg: 'Dish already exists.'});
        }
        console.log("Pesnya");
        res.send({success: true, msg: 'Successful created new dish.'});
    });
});



Router.get('/filter/:filter/period/:period/posts/:num', (req, res) => {

    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        const pageSize = 10;

        let findRequest = [];
        let fieldsAmount = 2;

        switch(req.params.filter) {
            case 'Meat': findRequest.push({ exceptions: {$ne: 'Meat'}}); break;
            case 'Milk': findRequest.push({ exceptions: {$ne: 'Milk'}}); break;
            case 'Sugar': findRequest.push({ exceptions: {$ne: 'Sugar'}}); break;
            default: fieldsAmount--; break;
        }

        switch(req.params.period) {
            case 'Breakfast': findRequest.push({ foodIntake: 'Breakfast' }); break;
            case 'Dinner': findRequest.push({ foodIntake: 'Dinner' }); break;
            case 'Supper': findRequest.push({ foodIntake: 'Supper' }); break;
            default: fieldsAmount--; break;
        }

        console.log(findRequest);

        let collection = db.collection('dishes');


        if(fieldsAmount == 2) {
            findRequest = {$and: findRequest};
        }
        if(fieldsAmount == 1) {
           findRequest = findRequest[0];
        }
        if(fieldsAmount == 0) {
            findRequest = {};
        }

        console.log(findRequest);

        let cursor = collection.find(findRequest)
                                .skip(pageSize * (req.params.num - 1))
                                .limit(pageSize).stream();

        let items = [];
        cursor.on('data', item => {
            items.push(item);
        });
        cursor.on('end', () => {
            console.log(items);
            res.json(items);
        });
    });
});

Router.get('/id/:id', function(req, res) {

    Dish.findOne({
            _id: req.params.id
        }, function(err, dish) {
            
            if (err) throw err;
        
            res.send(dish);
    });
    
}); 


Router.get('/ranked/up/:id', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        let oldScore;

        Dish.findOne({
            _id: req.params.id
        }, function(err, dish)  {
            if(err) res.send("Invalid id");
            oldScore = dish.rating;

            let collection = db.collection('dishes');

            collection.remove({ _id: dish._id });
            let newDish = dish;
            newDish.rating++;

            console.log(newDish);

            collection.save(newDish);

            res.send({ success: true, newScore: oldScore + 1 });

        });
    });
});

Router.get('/ranked/down/:id', function(req, res) {

    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        let oldScore;

        Dish.findOne({
            _id: req.params.id
        }, function(err, dish)  {
            if(err) res.send("Invalid id");
            oldScore = dish.rating;

            let collection = db.collection('dishes');

            collection.remove({ _id: dish._id });
            let newDish = dish;
            newDish.rating--;

            console.log(newDish);

            collection.save(newDish);

            res.send({ success: true, newScore: oldScore - 1 });

        });
    });

});

Router.post('/make_ration/settings', function(req, res) {

    let weight = +req.body.weight;
    let height = +req.body.height;
    let age = +req.body.age;

    console.log(weight);
    console.log(height);
    console.log(age);

    let kkal = 10 * weight + 6.25 * height - 4.92 * age - 161;

    let ration = [];

    for(let i = 0; i < 3; i++) {

        let option = [];

        MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        let collection = db.collection('dishes');

        let cursor = collection.find({$and: [{ foodIntake: 'Breakfast' }, { kkal: {$range: [ (kkal * 0.25)*0.8, (kkal * 0.25)*1.2]}}]})
                  .sort({ rating: 1  }).skip(i * 2).limit(1).stream();
        });

        cursor.on('data', item => {
            option.push(item);
        });
        cursor.on('end', () => {
        });

        cursor = collection.find({$and: [{ foodIntake: 'Dinner' }, { kkal: {$range: [ (kkal * 0.5)*0.8, (kkal * 0.5)*1.2]}}]})
                  .sort({ rating: 1  }).skip(i).limit(1).stream();

        cursor.on('data', item => {
            option.push(item);
        });
        cursor.on('end', () => {
        });

        cursor = collection.find({$and: [{ foodIntake: 'Breakfast' }, { kkal: {$range: [ (kkal * 0.25)*0.8, (kkal * 0.25)*1.2]}}]})
                  .sort({ rating: 1  }).skip(i * 2 + 1).limit(1).stream();

        cursor.on('data', item => {
            option.push(item);
        });
        cursor.on('end', () => {
        });

        ration.push(option);

        res.send(ration);
    }

});




module.exports = Router;