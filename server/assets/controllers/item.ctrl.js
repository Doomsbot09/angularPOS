const mongoose = require('mongoose');
const Items    = mongoose.model('Item');

// CREATE
module.exports.addItems = (req, res, next) => {
    var items = new Items();
        items.categoryID = req.body.categoryID;
        items.productCost = req.body.productCost;
        items.productName= req.body.productName;
        items.productPrice= req.body.productPrice;
        items.productQty= req.body.productQty;
        items.save((err, doc) => {
            if(!err){
                res.status(200).json({ message: 'success', data: doc })
            } else {
                if(err.code == 11000){
                    res.status(404).send("Duplicate Product Name")
                } else {
                    return next(err)
                }
            }
        })
};
// RETRIEVE
module.exports.getItems = (req, res) => {
    Items.find((err, items) => {
        if(!err){
            res.status(200).send(items)
        } else {
            res.status(404).send(err)
        }
    })
};
// UPDATE
module.exports.updateItems = (req, res) => {
    Items.findByIdAndUpdate({ _id: req.params.id }, 
        {
           $set:{
               productName: req.body.productName,
               productCost: req.body.productCost,
               productPrice: req.body.productPrice,
               productQty: req.body.productQty
           },
        },
        { 
            new: true 
        },
        (err, updated) => {
            if(!err){
                res.status(200).json({ message: 'success-updated', data: updated });
            } else {
                res.status(404).json({ message: err });
            }
        })
};
// DELETE
module.exports.deleteItem = (req, res) => {
    Items.findByIdAndRemove({ _id: req.params.id }, (err, deleted) => {
        if(!err){
            res.status(200).send(deleted);
        } else {
            res.status(404).send(err);
        }
    })
};