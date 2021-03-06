const mongoose      = require('mongoose');
const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
const User          = mongoose.model('User');

passport.use(
    new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if(err){
                return done(err)
            } //unknown user 
            else if(!user) {
                return done(null, false, { message: 'Username is not registered.' });
            } //wrong password
            else if(!user.verifyPassword(password)) {
                return done(null, false, { message: 'Wrong password.' });
            } // authentication success 
            else {
                return done(null, user);
            }
        })
    })
)