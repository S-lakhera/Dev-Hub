const Interaction = require("../models/interaction.model");

const toggleLike = async (req, res) => {
    try {
        const { targetId, targetType } = req.body;
        const userId = req.user.id;

        const existingLike = await Interaction.findOne({ 
            user: userId, 
            targetId, 
            type: 'like' 
        });

        if (existingLike) {
            await existingLike.deleteOne();
            return res.json({ message: "Unliked successfully" });
        }

        await Interaction.create({
            user: userId,
            targetId,
            targetType,
            type: 'like'
        });

        res.json({ message: "Liked successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { targetId, targetType, text } = req.body;
        
        const comment = await Interaction.create({
            user: req.user.id,
            targetId,
            targetType,
            type: 'comment',
            commentText: text
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInteractions = async (req, res) => {
    try {
        const interactions = await Interaction.find({ targetId: req.params.id })
            .populate("user", "name profilePicture")
            .sort({ createdAt: -1 });

        const likes = interactions.filter(i => i.type === 'like').length;
        const comments = interactions.filter(i => i.type === 'comment');

        res.json({ likes, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { toggleLike, addComment, getInteractions };