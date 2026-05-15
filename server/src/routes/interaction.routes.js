const express = require("express");
const router = express.Router();
const { toggleLike, addComment, getInteractions } = require("../controllers/interaction.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/:id", getInteractions);

router.use(protect);
router.post("/like", toggleLike);
router.post("/comment", addComment);

module.exports = router;