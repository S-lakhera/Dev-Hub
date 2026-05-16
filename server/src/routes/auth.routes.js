const express = require("express");
const { registerUser, loginUser, refresh, logoutUser } = require("../controllers/auth.controller");
let router = express.Router();

// const { protect } = require('../middleware/auth.middleware');

// // This is just for testing
// router.get('/me', protect, (req, res) => {
//     res.json(req.user);
// });

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
    .post(logoutUser)

    

module.exports = router;