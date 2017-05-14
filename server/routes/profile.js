const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const Dish = require('../models/dish');
const MongoClient = require('mongodb').MongoClient;


Router.post('/change_password', function(req, res) {

    User.findOneAndUpdate({ name: req.body.name}, { password: req.body.password });

});

Router.post('/setting', function(req, res) {

    User.findOneAndUpdate({ name: req.body.name }, {
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        exceptions: req.body.exceptions
    });
});


Router.get('/:ud/favorite/add/:id', function(req, res) {
    
    MongoClient.connect("mongodb://localhost:27017/xration", function(err, db) {
        
        if(err) return console.log(err);

        let oldScore;

        User.findOne({
            _id: req.params.ud
        }, function(err, user)  {
            if(err) res.send("Invalid id");
            
            let oldUser = user;

            let collection = db.collection('user');

            collection.remove({ _id: user._id });
            
            Dish.findOne({ _id: req.params.id },  function(err, dish)  {
                if(err) res.send("Error dish id");

                oldUser.favorites.push(dish);

                collection.save(oldUser);

                res.send({success: true, newFavorites: oldUser.favorites});
            });
        });
    });
});

Router.get('/:ud/favorites', function(req, res) {

    User.findOne({ _id: req.params.ud}, function(err,  user){
        res.send(err ? "Error" : user.favorites);
    });

});


module.exports = Router;