const express = require('express')
const router = express.Router()
const { 
    getUserData,
    createUser, 
    verifyEmail,
    login,
    updateUserData,
    updateEmailSendOTP,
    updateEmail
} = require('../controllers/userController')

router.get('/', getUserData)
router.put('/', updateUserData)
router.post('/register', createUser)
router.post('/verify', verifyEmail)
router.post('/login', login)
router.post('/update-email-otp', updateEmailSendOTP)
router.put('/update-email', updateEmail)

module.exports = router