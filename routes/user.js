const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm) //signup -> get
    .post(wrapAsync(userController.signup));//signup -> post

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(  //login -> post
        saveRedirectUrl,
        passport.authenticate("local",{
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.login
    );


//login -> get
// router.get("/login",userController.renderLoginForm);

//logout
router.get("/logout",userController.logout);

module.exports = router;