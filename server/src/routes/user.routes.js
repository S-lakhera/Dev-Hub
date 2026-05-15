
const express= require("express");
const { updateProfile, getMe, getDeveloperById, getAllDevelopers } = require("../controllers/user.controller");
const { protect } = require('../middleware/auth.middleware');
const { upload } = require("../services/imageKit.service");

const router = express.Router();

// Un-Protected routes
router.get("/profile/:id", getDeveloperById);
router.get("/", getAllDevelopers)

// Protected routes
router.use(protect);
router.get("/me", getMe);
router.patch("/update",upload.single('profilePicture'), updateProfile);

module.exports = router;