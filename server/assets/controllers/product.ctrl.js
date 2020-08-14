const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// CREATE
module.exports.addProductType = (req, res, next) => {
    var prod = new Product();
        prod.productType = req.body.productType;
        prod.save((err, doc) => {
            if(!err){
                res.status(200).json({ message: 'success', data: doc });
            } else {
                if(err.code == 11000){
                    res.status(404).send("Duplicate Product Type");
                } else {
                    return next(err);
                }
            }
        })
};
// RETRIEVE
module.exports.getProductType = (req, res) => {
    Product.find((err, products) => {
        if(!err){
            res.status(200).send(products)
        } else {
            res.status(404).send(err)
        }
    })
};
// UPDATE
module.exports.updateProductType = (req, res) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, 
        {
            $set: {
                productType: req.body.addProductType
            }
        },
        {
            new: true
        }, (err, updated) => {
            if(!err){
                res.status(200).send(updated);
            } else {
                res.status(404).send(err)
            }
        })
};