const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
 

let UserSchema = new Schema({
  name: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    age: {
        type: Number
    },
    exceptions: {
        type: Array
    },
    favorites: {
        type: Array,
        default: []
    }
});
 
UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (_password, callback) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);