const mongoose = require('mongoose');

const CauseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    progress: { type: Number, required: true },
    targetAmount: { type: Number, required: true },
    fundsRaised: { type: Number, required: true },
    startDate: { type: Date, required: true }, // Start date of the campaign
    endDate: { type: Date, required: true },   // End date of the campaign
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    updates: [{ date: { type: String }, text: { type: String } }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    isTrending: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    donors: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: { type: Number } }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Reference comments
});

// Virtual field to calculate daysLeft
CauseSchema.virtual('daysLeft').get(function () {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const diffInTime = endDate - startDate;

    // Calculate difference in days
    const daysLeft = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 ? daysLeft : 0; // Return 0 if campaign has ended
});

// Add virtual field 'id' that maps to '_id'
CauseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are included in JSON responses
CauseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cause', CauseSchema);
