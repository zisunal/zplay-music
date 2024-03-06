const express = require('express')
const router = express.Router()
const { 
    getUserData,
    createUser, 
    verifyEmail,
    login,
    updateUserData,
    updateEmailSendOTP,
    updateEmail,
    checkUsername,
    updateUsername,
    updatePassword,
    checkTokenExpiry,
    sendResetOTP,
    validateOTP,
    resetPassword
} = require('../controllers/userController')

router.get('/', getUserData)
router.put('/', updateUserData)
router.post('/register', createUser)
router.post('/verify', verifyEmail)
router.post('/login', login)
router.post('/update-email-otp', updateEmailSendOTP)
router.put('/update-email', updateEmail)
router.post('/check-username', checkUsername)
router.put('/update-username', updateUsername)
router.put('/update-password', updatePassword)
router.get('/check-token-expiry', checkTokenExpiry)
router.put('/password-reset-otp', sendResetOTP)
router.post('/validate-otp', validateOTP)
router.put('/reset-password', resetPassword)

module.exports = router