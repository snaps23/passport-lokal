var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs")

var userSchema = mongoose.Schema({
    fullname: String,
    username : String,
    email : String,
    password : String
}); 

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = mongoose.model("users", userSchema);

