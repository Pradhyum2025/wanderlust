const  express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const Review=require("../models/reviews.js");
const Listing =require("../models/listing.js");

const reviewController=require("../controllers/reviews.js")
const {reviewSchema}=require("../schema.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        console.log("Bad request");
        throw new ExpressError(400,"Review is invalid");
    }else{
        next();
    }
}

// post review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview));

// review delete route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview));


module.exports=router;