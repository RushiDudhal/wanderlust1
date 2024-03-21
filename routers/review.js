const express = require("express");
const router = express.Router({mergeParams: true});   

const Listing = require("../models/listing.js")
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {reviewSchema} = require("../schema.js");
const { isLoggedIn,isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controller/reviews.js");

//reviews validation----
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        console.log(error);
        console.log(errMsg);
        throw new ExpressError(400,errMsg)        
    }else{
        next();
    }
}


//------------------------------------------------Create Reviews Route--------------------------------------------
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//------------------------------------------------Delete Reviews Route--------------------------------------------
router.delete("/:reviewId",isLoggedIn,wrapAsync(reviewController.destroyReview));

module.exports = router;