const passport = require('passport');
const User = require('../models/user');

passport.use(User.createStrategy());