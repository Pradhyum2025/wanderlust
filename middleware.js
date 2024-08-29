const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    // original path
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","You must be logged in!");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirect=req.session.redirectUrl;
  }
  next();
}


module.exports.isOwner= async(req,res,next)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id); 
  let currUser=res.locals.currUser
  if(currUser && listing.owner._id.equals(currUser._id)){
    return next();
  }
    next(new ExpressError(404,"Page not found"));
  
}

module.exports.isAuthor= async(req,res,next)=>{
  let {reviewId}=req.params;
  let currReview=await Review.findById(reviewId); 
  let currUser=res.locals.currUser
  console.log(currReview);
  console.log(currUser);
  if(currUser && currReview.author._id.equals(currUser._id)){
    return next();
  }
    next(new ExpressError(404,"Page not found"));
}

