const express = require("express");
const router = express.Router();
const { 
    createBlog, 
    getAllBlogs, 
    getBlogById, 
    deleteBlog 
} = require("../controllers/blog.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.use(protect);

router.post("/", createBlog);
router.delete("/:id", deleteBlog);

module.exports = router;