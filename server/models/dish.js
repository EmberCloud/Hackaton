const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
 

let DishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    kkal: {
        type: Number
    },
    exceptions: {
        type: Array
    },
    foodIntake: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
});

DishSchema.methods.likeDish = function (callback) {
    this.rating++;
    callback(null);
};
DishSchema.methods.dislikeDish = function (callback) {
    this.rating--;
    callback(null);
}
  

module.exports = mongoose.model('Dish', DishSchema);