const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 7
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    otp: {
        type: String,
        required: false,
        trim: true,
        minlength: 6
    },
    otpExpires: {
        type: Date,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)