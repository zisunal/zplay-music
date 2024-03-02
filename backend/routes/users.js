const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/userController')

//Test Route
router.get('/', (req, res) => {
    res.json({message: 'Users route'})
})

router.post('/register', createUser)

module.exports = router