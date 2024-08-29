//require mongoose package
const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userScheama=new Schema({
  email:{
    type:String,
    required:true 
  }
});

userScheama.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userScheama);