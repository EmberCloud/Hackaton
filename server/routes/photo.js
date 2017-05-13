const express = require('express');
const Router = express.Router();


Router.get('/:name', (req, res) => {
    
    let options = {
        root: __dirname + '/../images/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-send': true 
        }
    };

    res.sendFile(req.params.name, options, function(err) {
        console.log(err ? err : "File was sended!");
    });

});


module.exports = Router;