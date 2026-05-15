const tokenService = require('../services/tokenService');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: 'Not authorized, access token missing' });
    }

    try {
        const decoded = tokenService.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
        
        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized, token invalid' });
        }

        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = { protect };