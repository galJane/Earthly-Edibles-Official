const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ct2productSchema = new Schema ({
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
    recipe: {
        type: String,
        required: true
    },
    description: String,
    img2: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },


});

module.exports = mongoose.model('Ct2product', ct2productSchema);