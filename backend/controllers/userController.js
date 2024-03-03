const User = require('../models/UserModel')
const transporter = require('../libs/mailer')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const dotenv = require('dotenv').config()

//Helper functions
// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
};
//Generate Username
const generateUsername = (fullName) => {
    const username = fullName.split(' ')[fullName.split(' ').length - 1].toLowerCase() + Math.floor(Math.random() * 1000)
    return username
}

//Create a user
const createUser = async (req, res) => {
    if (!req.body.fullName || !req.body.email || !req.body.gender || !req.body.dob || !req.body.password) {
        return res.status(400).json({ message: 'All the fields are required' })
    }
    // Check if email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    const user = new User({
        username: generateUsername(req.body.fullName),
        fullName: req.body.fullName,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        password
    })
    try {
        const newUser = await user.save()
        // Send verification email
        const verificationLink = req.body.verifyUrl.replace(':id', newUser._id)
        const mailOptions = {
            from: 'alzisun16917@gmail.com',
            to: newUser.email,
            subject: 'Account Verification',
            text: `Please click on the following link to verify your account: ${verificationLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Verify email
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        user.isVerified = true
        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Login Session using JWT
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'User Email is not verified' })
        }
        if (bcrypt.compare(req.body.password, user.password) === false) {
            return res.status(400).json({ message: 'Invalid Password' })
        }
        const token = generateToken(user);
        res.status(200).json({ token }); 
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Get user data by token from authorization header
const getUserData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update user data by token from authorization header
const updateUserData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        user.fullName = req.body.fullName
        user.dob = req.body.dob
        user.gender = req.body.gender
        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Export functions
module.exports = { 
    getUserData,
    createUser, 
    verifyEmail,
    login,
    updateUserData
}