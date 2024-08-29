const Review=require("../models/reviews.js");
const Listing =require("../models/listing.js");

//post reviews
module.exports.postReview=async (req,res)=>{
  const {id}=req.params;
  let listing=await Listing.findById(id);
  let newReviews=new Review(req.body.review);
  listing.reviews.push(newReviews);
  newReviews.author=req.user._id;
  await newReviews.save();
  let result = await listing.save();
  res.redirect(`/listings/${id}`);
}

//destroy  review route
module.exports.destroyReview=async(req,res)=>{
  let {id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success','Review was deleted!');
  res.redirect(`/listings/${id}`);
}