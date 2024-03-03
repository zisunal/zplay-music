const express = require('express')
const router = express.Router()
const { 
    getUserData,
    createUser, 
    verifyEmail,
    login,
    updateUserData
} = require('../controllers/userController')

router.get('/', getUserData)
router.put('/', updateUserData)
router.post('/register', createUser)
router.post('/verify', verifyEmail)
router.post('/login', login)

module.exports = router