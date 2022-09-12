const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedOrderSchema = new Schema ({
    itemId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: String
    }
   
});

module.exports = mongoose.model('savedOrder', savedOrderSchema);