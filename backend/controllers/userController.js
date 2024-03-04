/**
 * Controller module for user-related operations.
 * @module userController
 */

const User = require('../models/UserModel')
const transporter = require('../libs/mailer')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
require('dotenv').config()

/**
 * Generates a JSON Web Token (JWT) for the given user.
 * @param {Object} user - The user object.
 * @returns {string} - The JWT token.
 */
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
};

/**
 * Generates a username based on the given full name.
 * @param {string} fullName - The full name of the user.
 * @returns {string} - The generated username.
 */
const generateUsername = (fullName) => {
    const username = fullName.split(' ')[fullName.split(' ').length - 1].toLowerCase() + Math.floor(Math.random() * 1000)
    return username
}

/**
 * Creates a new user with the provided information and sends a verification email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The newly created user object.
 */
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

/**
 * Verifies the email of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated user object.
 */
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

/**
 * Logs in a user using email and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The JWT token.
 */
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'User Email is not verified' })
        }
        await bcrypt.compare(req.body.password, user.password).then(result => {
            if (result) {
                const token = generateToken(user)
                res.status(200).json({ token })
            } else {
                res.status(400).json({ message: 'Incorrect password' }); 
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * Gets the user data based on the JWT token from the authorization header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The user object.
 */
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

/**
 * Updates the user data based on the JWT token from the authorization header.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated user object.
 */
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

/**
 * Sends an OTP to update the user's email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The success message.
 */
const updateEmailSendOTP = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (user.email === req.body.email) {
            return res.status(400).json({ message: 'New email is same as old email' })
        }
        await User.where('email', req.body.email).then(result => {
            if (result.length > 0) {
                return res.status(400).json({ message: 'Email already exists' })
            }
        })
        
        const otp = Math.floor(100000 + Math.random() * 900000)
        user.otp = otp
        await user.save().then((user) => {
            const mailOptions = {
                from: 'alzisun16917@gmail.com',
                to: req.body.email,
                subject: 'Email Verification',
                text: `Your OTP for updating your Email is: ${user.otp}`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
            res.status(200).json({ message: 'OTP sent', email: req.body.email })
        })
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * Updates the user's email based on the provided OTP.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The success message.
 */
const updateEmail = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    if (user.email == req.body.email) {
        return res.status(400).json({ message: 'New Email can not be same as earlier' })
    }
    await User.where('email', req.body.email).then(result => {
        if (result.length > 0) {
            return res.status(400).json({ message: 'Email already exists' })
        }
    })
    if (user.otp != req.body.otp) {
        return res.status(400).json({ message: 'OTP is invalid' })
    }
    user.email = req.body.email
    await user.save().then(() => {
        return res.status(200).json({ message: 'Email is updated' })
    })
}

//Export functions
module.exports = { 
    getUserData,
    createUser, 
    verifyEmail,
    login,
    updateUserData,
    updateEmailSendOTP,
    updateEmail
}