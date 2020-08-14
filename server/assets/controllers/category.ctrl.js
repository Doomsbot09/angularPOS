const mongoose = require('mongoose');
const Category = mongoose.model('Category');

// CREATE
module.exports.addProductType = (req, res, next) => {
    var category = new Category();
        category.productTypeID = req.body.productTypeID;
        category.categoryName = req.body.categoryName;
        category.save((err, doc) => {
            if(!err){
                res.status(200).json({ message: 'success', data: doc });
            } else {
                if(err.code == 11000){
                    res.status(404).send("Duplicate Category Name");
                } else {
                    return next(err);
                };
            }
        })
};
// RETRIEVE
module.exports.getCategories = (req, res) => {
    Category.find({}, (err, categories) => {
        if(!err){
            res.status(200).send(categories);
        } else {
            res.status(404).send(err)
        }
    })
};
// UPDATE
module.exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate({ _id: req.params.id }, 
        {
            $set: {
                categoryName: req.body.categoryName
            }
        }, {
            new: true
        }, (err, updated) => {
            if(!err){
                res.status(200).json({ message: 'success-update', data: updated });
            } else {
                res.status(404).send(err);
            }
        })
};
// DELETE
module.exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove({ _id: req.params.id }, (err, deleted) => {
        if(!err){
            res.status(200).send(deleted)
        } else {
            res.status(404).send(err)
        }
    })
};