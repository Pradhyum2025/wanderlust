const Listing=require("../models/listing.js")

//for index route
module.exports.index=async(req,res)=>{
  
  
  let allListings= await Listing.find({}).populate("reviews")
  res.render("./listings/index.ejs",{allListings});

}
//for index route for filters
module.exports.indexFilters=async(req,res)=>{
  let {q}=req.query;
  let allListings= await Listing.find({category:{$in :[q]}}).populate("reviews");
  res.render("./listings/index.ejs",{allListings});
}
//Create route - GET request
module.exports.createListing=(req,res)=>{
  res.render("./listings/new.ejs");
}

//Create route - POST request
module.exports.postListing= async (req,res)=>{ 
  let newListing=new Listing(req.body.listing);
  //upload image URL
  let filename=req.file.filename;
  let url=req.file.path;
  newListing.image={filename,url};

// user infomation save with current listing
  newListing.owner=req.user._id;

  let savedListing=await newListing.save();

  req.flash('success','new listing created!');
  res.redirect("/listings");
}

//for show route 
module.exports.showListing=async (req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id).populate({path:"reviews",populate:{path: "author"}}).populate("owner");
  res.render("./listings/show.ejs",{listing}); 
}
//edit listing
module.exports.editListing=async(req,res)=>{
  let {id}=req.params;
  let listing= await Listing.findById(id);
  res.render("./listings/edit.ejs",{listing});
}
//update route - patch request
module.exports.updateListing=async (req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file !== "undefined"){
    let filename=req.file.filename;
    let url=req.file.path;
    listing.image={filename,url};
    await listing.save();
  }
  req.flash('success','Listing successfully updated!');
  res.redirect(`/listings/${id}`)
}
//destroy route
module.exports.destroyListing=async(req,res)=>{
  let {id}=req.params;
  let deleteListing= await Listing.findByIdAndDelete(id);
  req.flash("success","Listing deleted!");
  res.redirect("/listings")
}