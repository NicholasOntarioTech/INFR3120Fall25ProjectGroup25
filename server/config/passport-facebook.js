const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy(
    {   //registers with the facebook authentication for the webapp
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: "https://infr3120fall25projectgroup25-5jme.onrender.com/auth/facebook/callback",
        profileFields: ['id', 'emails', 'displayName', 'photos']
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.id});
            if (user) 
                return done(null, user);//checks if user exists already, if not creates a new one

            const email = profile.emails?.[0]?.value || `${profile.id}@facebook.local`; //creates a local email from the facebook profile
            
            user - await User.create({ //creates a user based on the account provideds information
                username: profile.id,
                email: email,
                displayName: profile.displayName || profile.username,
                facebookId: profile.id,
                profilePhoto: profile.photos?.[0]?.value || ""
            });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;