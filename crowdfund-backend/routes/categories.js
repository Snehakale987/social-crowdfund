// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Cause = require('../models/Cause');

// GET /api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const causes = await Cause.find({ category: req.params.id });
        res.json({ categoryName: category.name, causes });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
