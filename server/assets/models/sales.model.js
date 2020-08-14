const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var saleSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    productCost:{
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Date:{
        type: Date,
    }
});

mongoose.model('Sale', saleSchema);