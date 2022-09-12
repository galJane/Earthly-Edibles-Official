const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userFName: {
        type: String
    },
    userLName: {
        type: String
    },
     userEmail: {
        type: String
    },
    userPassword: {
        type: String
    },

    userAddress: {
        add0: { type: String },
        city: { type: String },
        state: { type: String },
        zip: {type: Number },
        userPhone: { type: Number}
    }
    
   
});

module.exports = mongoose.model('User', userSchema);