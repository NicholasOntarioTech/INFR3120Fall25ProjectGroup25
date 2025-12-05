const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
    { //registers with the google authentication for the webapp
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://infr3120fall25projectgroup25-5jme.onrender.com/auth/google/callback"
    },
  
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
  
        if (user) 
          return done(null, user); //checks if user exists, if not creates a new one
  
        user = await User.create({ //takes the information from the google account used to build a user for our site
          username: profile.emails[0].value,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          googleId: profile.id,
          profilePhoto: profile.photos?.[0]?.value || ""
        });
  
        return done(null, user);
  
      } catch (err) {
        return done(err, null);
      }
    }
  ));
  
  module.exports = passport;