const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var ProductSchema = new Schema({
    productType: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model('Product', ProductSchema);