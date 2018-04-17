var passport = require("passport");
var localStrategy = require("passport-local").Strategy;

var User = require("../models/user");

module.exports= function(passport){

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("local-signup", new localStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, username, password, done) {
        User.findOne({ "username" : username  }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false);
            }

            var person = new User();
            person.fullname = fullname;
            person.username = username;
            person.email = email;
            person.password = person.encryptPassword(password);

            person.save(function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, person);
            });
        })
    }));
};