const Listing=require("../models/listing")
const User=require("../models/user")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const nodemailer = require("nodemailer");


module.exports.home=async (req, res) => {    
    res.render("listings/home.ejs");
} 

module.exports.requestPage=async(req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author"
        }
    }).populate("owner");
    // console.log(listing)
    res.render("listings/request.ejs",{listing})
}

module.exports.sendRequest = async (req, res) => {
    const { yourName, yourEmail, yourMsg } = req.body;
    let { id } = req.params;

    // Retrieve listing and user details
    const listinnForTitle = await Listing.findById(id);
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("owner");

    // Convert email and password to trimmed strings
    const emailid =listing.owner.email;
    const emailpass = String(listing.owner.emailPassword).trim();



    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: emailid,
            pass: listing.owner.emailPassword
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    const mailOptions = {
        from: yourEmail,
        to: emailid,
        subject: `Message from ${yourName} via Seva`,
        text: `Hello ${listing.owner.username}, I'm ${yourName} (${yourEmail}) requesting food from listing: ${listinnForTitle.title}\n\n${yourMsg}`
    };

    try {
        await transporter.sendMail(mailOptions);
        req.flash("success", `Request has been sent to ${listing.owner.username} successfully`);
        return res.redirect("/listings");
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
};


module.exports.searchResults=async (req, res) => {
    const query = req.query.title || '';
        const allListings = await Listing.find({ title: { $regex: query, $options: 'i' } });
        if(allListings.length < 1){
            req.flash("error","Food you searched for does not Available")
            return res.redirect("/listings")
        }
        res.render("listings/results.ejs", { allListings });
}

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",
        populate:{
            path:"author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error","Food you requested for does not Available")
        res.redirect("/listings")
    }
    // console.log(listing)
    res.render("listings/show",{listing});
}

module.exports.createListing=async(req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Food you requested for does not Available")
        res.redirect("/listings")
    }
    let originalImageUrl=listing.image.url
     originalImageUrl=originalImageUrl.replace("/upload","/upload/h_500,w_250")
    res.render("listings/edit.ejs",{listing,originalImageUrl}) 
 }

  module.exports.renderEditForm=async(req,res)=>{
    let {id} =req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})

    if(typeof req.file !=="undefined"){
        let url=req.file.path
        let filename=req.file.filename
        listing.image={url, filename}
        await listing.save()
    }

    req.flash("success","Food details Updated")
    res.redirect(`/listings/${id}`)
}

module.exports.updateListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    // Define valid values (all lowercase for easy comparison)
    const validCountries = ["veg", "nonveg"];
    const validCategories = ["raw", "cooked", "packed"];

    // Convert inputs to lowercase to ensure case-insensitive comparison
    const country = newListing.country.toLowerCase();
    const category = newListing.category.toLowerCase();

    // Validate `country`
    if (!validCountries.includes(country)) {
        req.flash("error", "Country should be 'veg' or 'nonveg'");
        return res.redirect("/listings/new");
    }

    // Validate `category`
    if (!validCategories.includes(category)) {
        req.flash("error", "Category should be 'raw', 'cooked', or 'packed'");
        return res.redirect("/listings/new");
    }

    let savedListing = await newListing.save();
    req.flash("success", "Food for donation is successfully added to seva!");
    res.redirect("/listings");
};


module.exports.distroyListing=async(req,res)=>{
    let {id} =req.params;
    let deleredListing=await Listing.findByIdAndDelete(id)
    // console.log(deleredListing)
    req.flash("success","Food Deleted!")
    res.redirect("/listings")
}