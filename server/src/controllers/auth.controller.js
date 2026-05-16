const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });

        const accessToken = tokenService.generateAccess(user._id);
        const refreshToken = tokenService.generateRefresh(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        // Set the cookies 
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            message: "User registered successfully",
            user: { _id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    const decoded = tokenService.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) return res.status(403).json({ message: "Token expired" });

    const newAccessToken = tokenService.generateAccess(user._id);

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    });

    res.json({ message: "Token refreshed" });
};

// Login user route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Using bcrypt.compare to verify password
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = tokenService.generateAccess(user._id);
            const refreshToken = tokenService.generateRefresh(user._id);

            user.refreshToken = refreshToken;
            await user.save();

            // Set the cookies 
            setCookies(res, accessToken, refreshToken);

            const { password, ...safeUser } = user.toObject();

            res.json({
                message: "Login successful",
                user: safeUser
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Log out user
const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await User.findOneAndUpdate({ refreshToken }, { $set: { refreshToken: "" } });
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        };

        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refresh,
    logoutUser
};