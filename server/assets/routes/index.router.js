const express = require('express');
const router  = express.Router();

// CONTROLLERS
const prodCtrl     = require('../controllers/product.ctrl');
const categoryCtrl = require('../controllers/category.ctrl');
const itemsCtrl    = require('../controllers/item.ctrl');
const userCtrl     = require('../controllers/user.ctrl');
const saleCtrl     = require('../controllers/sales.ctrl');
const jwtCtrl      = require('../config/jwtHelper');

// CREATE
// USER
router.post('/addUser', userCtrl.addUser);
// PRODUCTS
router.post('/addProductType', prodCtrl.addProductType);
// CATEGORY
router.post('/addCategory', categoryCtrl.addProductType);
// ITEMS
router.post('/addItems', itemsCtrl.addItems);
// SALES
router.post('/addSales', saleCtrl.addSales);

// RETRIEVE
// USER
router.get('/userProfile', jwtCtrl.verifyJwt, userCtrl.userProfile);
router.get('/getAllUsers', userCtrl.getAllUsers);
// PRODUCTS
router.get('/getProductType', prodCtrl.getProductType);
// CATEGORY
router.get('/getCategories', categoryCtrl.getCategories); 
// ITEMS
router.get('/getItems', itemsCtrl.getItems);
// SALES
router.get('/getSales', saleCtrl.getSales);

// UPDATE
// PRODUCT
router.put('/updateProductType/:id', prodCtrl.updateProductType);
// CATEGORY
router.put('/updateCategory/:id', categoryCtrl.updateCategory);
// ITEMS
router.put('/updateItems/:id', itemsCtrl.updateItems);

// DELETE
// CATEGORY
router.delete('/deleteCategory/:id', categoryCtrl.deleteCategory);
// ITEMS
router.delete('/deleteItem/:id', itemsCtrl.deleteItem);

// AUTH
router.post('/authenticate', userCtrl.authenticate);

// INVALID ENTRY POINT
router.get('*', (req, res) => { res.send("INVALID ENTRY POINT CHECK YOUR METHOD OR URL") });
router.post('*', (req, res) => { res.send("INVALID ENTRY POINT CHECK YOUR METHOD OR URL") });
router.put('*', (req, res) => { res.send("INVALID ENTRY POINT CHECK YOUR METHOD OR URL") });
router.delete('*', (req, res) => { res.send("INVALID ENTRY POINT CHECK YOUR METHOD OR URL") });

module.exports = router;