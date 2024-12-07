const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: 'default-profile.png' },
});

// Add virtual 'id' field
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are included in JSON responses
UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
