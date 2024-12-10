const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate a user using JWT
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        req.userEmail = req.user._doc.email

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;
