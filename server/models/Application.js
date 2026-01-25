const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    skills: {
        type: String,
        required: true,
    },
    applyingFor: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['research', 'acm'],
        required: true,
    },
    resume: {
        filename: String,
        contentType: String,
        size: Number,
        storage: { type: String, default: "fs" },
        path: String,
    },
    emailStatus: {
        sent: { type: Boolean, default: false },
        error: String,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
});

module.exports = mongoose.model('Application', ApplicationSchema);
