const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    cause: { type: mongoose.Schema.Types.ObjectId, ref: 'Cause', required: true }, // Reference the cause
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the user who commented
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Automatically store the comment creation date
});

// Add virtual field 'id' that maps to '_id'
CommentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are included in JSON responses
CommentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', CommentSchema);
