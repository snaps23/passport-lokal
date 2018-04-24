var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
passportConf = require("../config/passport");

var loggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/signin");
    }
}

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/signin", function (req, res, next) {
    if (req.user) {
        return res.redirect("/profile");
    } else {
        res.render("signin");
    }
});

router.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
}));

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/signin",
    failureRedirect: "/signup",
    failureFlash: true
})); 


router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get("/dashboard", loggedIn, function(req, res){
    res.render("dashboard");
});



module.exports = router;     