const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        required: true,
        enum: ['Project', 'Blog']
    },
    type: {
        type: String,
        required: true,
        enum: ['like', 'comment']
    },
    commentText: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);