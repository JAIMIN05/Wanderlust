const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
/* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. */
const multer  = require('multer'); 
const {storage} = require("../cloudConfig.js");
// const upload = multer({ dest: 'uploads/' }) //upload folder save image
const upload = multer({ storage }) //upload folder save image

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    
//New Route (isLoggedIn -> middleware)
router.get("/new", isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn, 
        isOwner,
        wrapAsync(listingController.destroyListing));
     

//Index Route (WrapAsync error handle)
// router.get("/",wrapAsync(listingController.index));


//Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

//Create Route
// router.post("/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
// );


//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditform)
);

//Update Route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

//DELETE Route
// router.delete("/:id",
//     isLoggedIn, 
//     isOwner,
//     wrapAsync(listingController.destroyListing));

module.exports = router;