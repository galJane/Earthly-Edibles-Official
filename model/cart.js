const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
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
    }
   
});

module.exports = mongoose.model('Cartproduct', cartSchema);