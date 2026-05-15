const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    bannerImage: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        maxLength: 500
    },

    skills: [{ type: String }],

    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        portfolio: String
    },
    refreshToken: {
        type: String
    }
},
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
});

module.exports = mongoose.model('User', userSchema);