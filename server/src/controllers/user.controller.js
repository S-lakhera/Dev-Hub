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
        console.log(req.body);
        
        if (req.body.skills) {
            req.body.skills = JSON.parse(req.body.skills);
        }
        if (req.body.socialLinks) {
            req.body.socialLinks = JSON.parse(req.body.socialLinks);
        }

        let updateData = { ...req.body };
        const userId = req.user.id;

        // Handle profile and banner image uploads (support both req.file and req.files)
        // Profile Picture
        let profileFile = null;
        if (req.files && req.files['profilePicture'] && req.files['profilePicture'][0]) {
            profileFile = req.files['profilePicture'][0];
        } else if (req.file && req.file.fieldname === 'profilePicture') {
            profileFile = req.file;
        }
        if (profileFile) {
            try {
                const profileUrl = await uploadToImageKit(profileFile.buffer, `profile-${userId}`);
                updateData.profilePicture = profileUrl;
            } catch (err) {
                console.error('Profile Image upload error:', err);
                return res.status(500).json({ message: 'Profile picture upload failed' });
            }
        }

        // Banner Image
        let bannerFile = null;
        if (req.files && req.files['bannerImage'] && req.files['bannerImage'][0]) {
            bannerFile = req.files['bannerImage'][0];
        } else if (req.file && req.file.fieldname === 'bannerImage') {
            bannerFile = req.file;
        }
        if (bannerFile) {
            try {
                const bannerUrl = await uploadToImageKit(bannerFile.buffer, `banner-${userId}`);
                updateData.bannerImage = bannerUrl;
            } catch (err) {
                console.error('Banner Image upload error:', err);
                return res.status(500).json({ message: 'Banner image upload failed' });
            }
        }

        // Update user in DB
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { returnDocument: 'after', runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

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