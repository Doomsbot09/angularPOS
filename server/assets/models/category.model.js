const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var CategorySchema = new Schema({
    productTypeID :{
        type: String,
    },
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});


mongoose.model('Category', CategorySchema);