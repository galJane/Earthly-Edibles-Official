const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema ({
    infoName: {
        type: String,
        required: true
    },
    infoCard: {
        type: String,
        required: true
    },
   
    infoMonth: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    infoYear: {
        type: String,
        required: true
    },
    infoType: {
        type: String,
        required: true
    },
    infoFirst: {
        type: String,
        required: true
    },
    infoLast: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    infoCity: {
        type: String,
        required: true
    },
    infoState: {
        type: String,
        required: true
    },
    infoZip: {
        type: String,
        required: true
    },
    infoPhone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Checkout', checkoutSchema);