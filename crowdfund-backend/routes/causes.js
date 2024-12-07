// routes/causes.js
const express = require('express');
const router = express.Router();
const Cause = require('../models/Cause');
const User = require('../models/User');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const Donor = require('../models/Donor');
const upload = require('../utils/upload'); // Multer configuration
const authenticateUser = require('../middleware/auth');


// GET /api/causes/trending
router.get('/trending', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default to 6 causes per page

    try {
        // Calculate total number of causes and skip count
        const totalCauses = await Cause.countDocuments({ isTrending: true });
        const skip = (page - 1) * limit;

        // Fetch paginated causes
        const causes = await Cause.find({ isTrending: true })
            .skip(skip)
            .limit(limit);

        // Send paginated results
        res.status(200).json({
            page,
            totalPages: Math.ceil(totalCauses / limit),
            totalCauses,
            causes,
        });
    } catch (error) {
        console.error('Error fetching trending causes:', error);
        res.status(500).json({ message: 'Failed to fetch trending causes' });
    }
});

// GET /api/causes/:id
router.get('/:id', async (req, res) => {
    try {
        const cause = await Cause.findById(req.params.id)
            .populate('category', 'name')
            .populate('creator', 'name email image')
            .populate('donors.user', 'name email image');

        if (!cause) {
            return res.status(404).json({ message: 'Cause not found' });
        }

        res.status(200).json(cause);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected route to add a comment
router.post('/:id/comments', authenticateUser, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
        const cause = await Cause.findById(req.params.id);
        if (!cause) {
            return res.status(404).json({ message: 'Cause not found' });
        }

        const comment = await Comment.create({
            cause: req.params.id,
            user: req.user._id, // Use authenticated user
            text,
        });

        cause.comments.push(comment._id);
        await cause.save();

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/causes/:id/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ cause: req.params.id })
            .populate('user', 'name email') // Populate user details
            .sort({ date: -1 }); // Sort comments by latest

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get donors for a specific cause
router.get('/:id/donors', async (req, res) => {
    try {
        const donors = await Donor.find({ cause: req.params.id })
            .sort({ date: -1 })
            .select('name amount anonymous date')
            .exec();

        res.status(200).json(donors);
    } catch (error) {
        console.error('Error fetching donors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add a new donor to a cause
router.post('/:id/donors', authenticateUser, async (req, res) => {
    const { amount, anonymous } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid donation amount' });
    }

    try {
        const donor = new Donor({
            name: req.user.name,
            email: req.user.email,
            amount,
            anonymous,
            cause: req.params.id,
        });

        await donor.save();

        res.status(201).json({ message: 'Donation successful', donor });
    } catch (error) {
        console.error('Error adding donor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/:id/donate', authenticateUser, async (req, res) => {
    try {
        const { amount, anonymous } = req.body;
        const userId = req.userId; // Assuming authentication middleware adds the user object
        const causeId = req.params.id;
        const userName = req.user;

        // Find the cause
        const cause = await Cause.findById(causeId);
        if (!cause) {
            return res.status(404).json({ message: 'Cause not found' });
        }

        // Update fundsRaised in the Cause schema
        cause.fundsRaised += amount;
        cause.progress = Math.min((cause.fundsRaised / cause.targetAmount) * 100, 100);
        await cause.save();

        // Add entry to the Donor collection
        const newDonor = await Donor.create({
            name: anonymous ? 'Anonymous' : req.user.name,
            email: req.user.email,
            amount,
            anonymous,
            cause: causeId,
        });

        res.status(200).json({
            message: 'Donation successful',
            fundsRaised: cause.fundsRaised,
            progress: cause.progress,
            donor: newDonor,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/create', authenticateUser, upload.array('images', 5), async (req, res) => {
    try {
        const { title, category, description, updates, targetAmount, startDate, endDate } = req.body;

        // Validate required fields
        if (!title || !category || !description || !targetAmount || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        // Extract image URLs
        const imagePaths = req.files.map((file) => `uploads/${file.filename}`);

        // Create the new cause
        const newCause = new Cause({
            title,
            category: new Category({_id:categoryExists._id,name:categoryExists.name}),
            description,
            images: imagePaths,
            updates: JSON.parse(updates), // Parse updates as JSON
            targetAmount,
            fundsRaised: 0, // Default funds raised
            progress: 0, // Default progress
            startDate,
            endDate,
            creator: req.user.id,
        });

        // Save to the database
        const savedCause = await newCause.save();

        return res.status(201).json(savedCause);
    } catch (error) {
        console.error('Error creating cause:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
