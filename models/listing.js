const { ref } = require("joi");
const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image:{
        // type: String,
        // default: "https://unsplash.com/photos/three-palm-trees-are-standing-in-the-water-yVdOtSShQpw",     
        // set: (v) => v === "" ? "https://unsplash.com/photos/three-palm-trees-are-standing-in-the-water-yVdOtSShQpw" : v, 
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // coordinates: {
    //     type: [Number],
    //     requires: true
    // }
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
});

listingSchema.post("findOneAndDelete",async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

/*
 // filename: {
        //     type: String,
        // },
        // url: {
        //     type: String,
        //     default: "https://unsplash.com/photos/three-palm-trees-are-standing-in-the-water-yVdOtSShQpw",
        //     // default: "https://www.pexels.com/photo/person-showing-gray-mountain-534164/"
        // }
*/