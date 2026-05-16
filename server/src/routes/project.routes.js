const express= require('express');
const { createProject, getMyProjects, updateProject, deleteProject, getAllProjects } = require('../controllers/project.controller');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { upload } = require('../services/imageKit.service');

// Un-Protected routes
router.get("/feed", getAllProjects);

// Protecting routes
router.use(protect)
router
    .route("/")
    .get(getMyProjects)
    .post(upload.single('thumbnail'),createProject)

router
    .route("/:id")
    .put(updateProject)
    .delete(deleteProject)

module.exports = router;