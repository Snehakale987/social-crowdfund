const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    anonymous: { type: Boolean, default: false },
    cause: { type: mongoose.Schema.Types.ObjectId, ref: 'Cause', required: true },
    date: { type: Date, default: Date.now },
});

// Add virtual field 'id' that maps to '_id'
DonorSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

DonorSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Donor', DonorSchema);
