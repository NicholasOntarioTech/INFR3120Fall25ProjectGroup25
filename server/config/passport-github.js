const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://infr3120fall25projectgroup25-5jme.onrender.com/auth/github/callback"
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id});
            if (user) 
                return done(null, user);
            user - await User.create({
                username: profile.username,
                email: profile.emails?.[0]?.value || "${profile.username}@github.local",
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