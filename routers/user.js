const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")

//--------------  sign up  ----------------
router
.route("/signup")
//SignUp  GET- request
.get(userController.userSignup)
//SignUp Post-request
.post(wrapAsync(userController.userSignupPost));



//--------------  login  -----------------

router
.route("/login")
//login request
.get(userController.userLogin)
//login authenticate
.post(saveRedirectUrl,passport.authenticate('local', 
  { failureRedirect: '/login',failureFlash:true}), userController.userAuthentication);


//----------------  logout -------------

//logout request
router.get("/logout",userController.userLogout);



module.exports=router;