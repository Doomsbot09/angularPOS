const mongoose = require('mongoose');
const passport = require('passport');
const User     = mongoose.model('User');
const _        = require('lodash');

// CREATE
module.exports.addUser = (req, res, next) => {
    var user = new User();
        user.userType = req.body.userType;
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.password = req.body.password;
        user.save((err, doc) => {
            if(!err){
                res.status(200).send(doc);
            } else {
                if(err.code == 11000){
                    res.status(404).send('Duplicate username');
                } else {
                    return next(err);                   
                }
            }
        });
};
// RETRIEVE
module.exports.userProfile = (req, res) => {
    User.findById({ _id: req._id }, (err, user) => {
        if(!user){
            res.status(404).json({ status: false, message: err});
        } else {
            res.status(200).json({ status: true, data: _.pick(user, ['userType','firstname', 'lastname']) });
        }
    })
};
module.exports.getAllUsers = (req, res) => {
    User.find((err, users) => {
        if(!err){
            res.status(200).json({ status: true, data:  _.map(users, _.partial(_.pick, _,['_id','userType','firstname', 'lastname'])) });
        } else {
            res.status(404).send(err)
        }
    })
};

// LOGIN
module.exports.authenticate = (req, res) => {
    // call for passport authentication.
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if(err){
            return res.status(400).json(err)
        } //registered user 
        else if(user) {
            return res.status(200).json({ "token": user.generateJwt(), data: _.pick(user, ['userType', 'firstname', 'lastname']) });
        } //unknown user or wrong password
        else {
            return res.status(404).json(info)
        }
    })(req, res);
}