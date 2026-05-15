const express = require("express");
const { registerUser, loginUser, refresh, logoutUser } = require("../controllers/auth.controller");
let router = express.Router();

router
    .route("/register")
    .post(registerUser)


router
    .route("/login")
    .post(loginUser)

router
    .route("/refresh")
    .post(refresh)

router
    .route("/logout")
    .get(logoutUser)

module.exports = router;