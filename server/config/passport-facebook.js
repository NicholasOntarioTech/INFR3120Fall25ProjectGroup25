const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'displayName', 'photos']
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ facebookId: profile.id});
            if (user) 
                return done(null, user);

            const email = profile.emails?.[0]?.value || `${profile.id}@facebook.local`;
            
            user - await User.create({
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