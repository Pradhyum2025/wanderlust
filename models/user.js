//require mongoose package
const mongoose=require("mongoose");
const Listing=require("./listing")

const Schema=mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userScheama=new Schema({
  email:{
    type:String,
    required:true 
  },
  contact:{
    type:Number,   
  },
  name:{
    type:String,
    default:"User5940"
  },
  image:{
    type:String,
    default:"https://images.unsplash.com/photo-1702482527875-e16d07f0d91b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  listings:[
    {
      type:Schema.Types.ObjectId,
      ref:"Listing"
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now()
}

});

userScheama.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userScheama);