const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim:true
    },

    description: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String,
        default: ""
    },

    techStack: [{ type: String }],

    githubLink: String,
    
    liveLink: String

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);