const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const passport = require('passport');

const mongo_config = require('./config/database');
const User_model = require('./models/user');


const Auth = require('./routes/auth');
const Photo = require('./routes/photo');
const Dish = require('./routes/recipe');
const Profile = require('./routes/profile');


const app = express();


app.use(cors());


app.use(morgan('dev')); // comment this line for hide server log
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());

mongoose.connect(mongo_config.database);
require('./config/passport')(passport);


app.use('/api/auth', Auth); 
app.use('/api/photo', Photo);
app.use('/api/dish', Dish);
app.use('/api/profile', Profile);


//app.use(favicon(path.join(__dirname, '/views/favicon.ico')));
app.use(express.static(path.join(__dirname, 'client')));


let port = 3000;
app.listen(port, () => {
    console.log('Server started at port ' + port + '!');
});
