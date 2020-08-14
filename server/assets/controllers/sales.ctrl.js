const mongoose = require('mongoose');
const Sale     = mongoose.model('Sale');

module.exports.addSales = (req, res, next) => {
    var sales = new Sale();
        sales.userID = req.body.userID;
        sales.itemID = req.body.itemID;
        sales.productCost = req.body.productCost;
        sales.productName = req.body.productName;
        sales.productPrice = req.body.productPrice;
        sales.Quantity = req.body.Quantity;
        sales.Date = new Date();
        sales.save((err, doc) => {
            if(!err){
                res.status(200).send(doc)
            } else{
                res.status(404).send(err)
            }
            return next(err)
        })
};

module.exports.getSales = (req, res) => {
    Sale.find((err, sales) => {
        if(!err){
            res.status(200).send(sales)
        } else {
            res.status(404).send(err)
        }
    })
};