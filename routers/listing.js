const  express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js")
let {isLoggedIn,isOwner}=require("../middleware.js");
const {listingSchema}=require("../schema.js");
const listingControllers=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}


router
.route("/")
//index route
.get(wrapAsync(listingControllers.index))
//Create route - POST request
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingControllers.postListing)
);
 
//index filters route
router
.route("/filters")
.get(wrapAsync(listingControllers.indexFilters));

    
//Create route - GET request
router.get("/new",isLoggedIn,listingControllers.createListing);

router
.route("/:id")
//Show route
.get(wrapAsync(listingControllers.showListing))
//destroy route
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.destroyListing));



router
.route("/:id/edit")
//Edit route - GET request
.get(isLoggedIn,isOwner,wrapAsync(listingControllers.editListing))
//update route - patch request
.patch(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing, 
    validateListing,wrapAsync(listingControllers.updateListing));

module.exports=router;