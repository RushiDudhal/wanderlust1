//const Listing= require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewScema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You are not the author of this review");
        return res.redirect("/login");
    }
    next();

}



module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

