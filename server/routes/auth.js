const express = require('express');
const User = require('../models/user');
const Router = express.Router();
const jwt = require('jwt-simple');
const config = require('../config/database');

Router.post('/login', function(req, res) {
    
    User.findOne({
        name: req.body.username
    }, function(err, user) {
        
        if (err) throw err;
    
        if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
            let token = jwt.encode(user, config.secret);
            res.json({success: true, token: 'JWT ' + token});
            } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        });
        }
    });
}); 

Router.post('/signup', function(req, res) {
    
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {
        let newUser = new User({
        name: req.body.username,
        password: req.body.password
        });
        newUser.save(function(err) {
        if (err) {
            console.log(err);
            return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

module.exports = Router;