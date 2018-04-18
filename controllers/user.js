var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
require("../config/passport");



router.get("/", function(req, res){
    res.render("index"); 
});

router.get("/signin", function(req, res){
    res.render("signin");
});

router.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true
})); 

router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
})); 

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

router.get("/profile", function(req, res){
    res.render("profile", {user: req.user});
});



module.exports = router;     