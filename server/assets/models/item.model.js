const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var itemSchema = new Schema({
    categoryID: {
        type: String
    },
    productCost:{
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQty: {
        type: Number,
        required: true
    }
});

mongoose.model('Item', itemSchema);
