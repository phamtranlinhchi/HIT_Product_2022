const passport = require("passport");
const { User } = require("../models");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

/*  Google AUTH  */
passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async(accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ email: profile.emails[0].value });

            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({
                email: profile.emails[0].value,
                username: profile.displayName,
            }).save();
            return done(null, user);
        },
    ),
);