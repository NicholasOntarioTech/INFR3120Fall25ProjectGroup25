const passport = require('passport');
const User = require('../models/user');

require('./passport-local');

//loads OAuth login files
require('./passport-google');
require('./passport-github');
require('./passport-facebook');

//stores the userid for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//reads which user is on the website through their id
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport