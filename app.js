var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var mongoStore = require("connect-mongo")(session);
var flash = require("express-flash");
var path = require("path");
var port = process.env.PORT || 8080;

var app = express();
var routes = require("./controllers/user");

mongoose.connect("mongodb://localhost/mahatma");

require("./config/passport");

app.set("view engine", "ejs");
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({
    secret: "mylittlesecret",
    resave: true,
    saveUninitialized: false  ,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


app.listen(port, function(){
    console.log("we are live on " + port);
});