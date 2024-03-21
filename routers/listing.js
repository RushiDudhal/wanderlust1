const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")
const {isLoggedIn}= require("../middleware.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage })

const listingController=require("../controller/listing.js");

//listings validation-----
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        console.log(error);
        console.log(errMsg);
        throw new ExpressError ( 400, errMsg);
    }else{
        next();
    }
}

 

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,wrapAsync(listingController.destroyListing));


//----------------------------------------------Index Route----------------------------------------------



//----------------------------------------------CREATE (New & Create Route)----------------------------------------------




//----------------------------------------------READ (Show Route)----------------------------------------------


//----------------------------------------------UPDATE (Edit & Update Route)----------------------------------------------
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));



//----------------------------------------------DELETE (Delete Route)----------------------------------------------


//export----------------
module.exports = router;