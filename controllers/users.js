const User=require("../models/user");

//SignUp  GET - request
module.exports.userSignup=async(req,res)=>{
  res.render("users/signup.ejs");
}

//SignUp Post-request
module.exports.userSignupPost=async(req,res)=>{
  try{
    let {username,email,password} = req.body.signup;
  
    const newUser = new User({ email, username});
  
    const registeredUser=await User.register(newUser,password);
    
    req.login(registeredUser,(err)=>{
      if(err){
       return next(err);
      }
      req.flash("success","Welcome to Listings")
      res.redirect("/listings");
    });

  }catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
  }
    
}
//user login request
module.exports.userLogin=(req,res)=>{
  res.render("users/login.ejs")
}

//login authenticate
module.exports.userAuthentication=(req, res)=>{
  req.flash("success","Welcome back!!");
  let redirectUrl=res.locals.redirect?res.locals.redirect:"/listings";
  res.redirect(redirectUrl);
}

//logout request
module.exports.userLogout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      next(err);
    }
    req.flash("success","You have successfully log-Out");
    res.redirect("/listings");                                                                            
  });
}
//get profile
module.exports.getProfile = async(req,res)=>{
  let {userId}=req.params;
  let getUser= await User.findById(userId).populate("listings");
  res.render("users/profile.ejs",{getUser}); 
}
//edit profile
module.exports.editProfile = async(req,res)=>{
  console.log("edited profile");
  let {userId}=req.params;
  console.log(req.body.userInfo);
  let getUser= await User.findByIdAndUpdate(userId,{...req.body.userInfo});
  res.redirect(`/user/${userId}`);
  
}