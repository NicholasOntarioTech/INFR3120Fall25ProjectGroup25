const passport = require('passport');
const User = require('../models/user');

require('./passport-local');

require('./passport-google');
require('./passport-github');
require('./passport-facebook');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport