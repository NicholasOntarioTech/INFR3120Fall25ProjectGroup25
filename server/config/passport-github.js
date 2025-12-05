const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

passport.use(new GitHubStrategy(
    { //registers with the github authentication for the webapp
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://infr3120fall25projectgroup25-5jme.onrender.com/auth/github/callback"
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id});
            if (user) 
                return done(null, user);//checks if user exists, if not creates a new one

            user - await User.create({//takes the information from the github account used to build a user for our site
                username: profile.username,
                email: profile.emails?.[0]?.value || "${profile.username}@github.local", //creates a local email if the account does not provide one
                displayName: profile.displayName || profile.username,
                githubId: profile.id,
                profilePhoto: profile.photos?.[0]?.value || ""
            });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;