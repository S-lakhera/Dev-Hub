const User = require('../models/user.model');
const { uploadToImageKit } = require('../services/imageKit.service');

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDeveloperById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "Developer not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            try {
                const imageUrl = await uploadToImageKit(req.file.buffer, `profile-${req.user.id}`);
                updateData.profilePicture = imageUrl;
            }
            catch(err){
                console.error('Image upload error:', err);
                return res.status(500).json({ message: 'Profile upload failed' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { returnDocument: 'after', runValidators: true }
        ).select("-password");

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllDevelopers = async (req, res) => {
    try {
        const { search, tech } = req.query;
        let query = {};

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (tech) {
            query.skills = { $in: [new RegExp(tech, 'i')] };
        }

        const developers = await User.find(query)
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(developers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateProfile, getMe, getDeveloperById, getAllDevelopers };