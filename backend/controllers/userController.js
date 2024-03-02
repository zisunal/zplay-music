const User = require('../models/UserModel')

//Create a user
const createUser = async (req, res) => {
    //Generate Username
    const generateUsername = (fullName) => {
        const username = fullName.split(' ').join('').toLowerCase()
        username = username + Math.floor(Math.random() * 1000)
        return username
    }
    if (!req.body.fullName || !req.body.email || !req.body.gender || !req.body.dob || !req.body.password) {
        return res.status(400).json({ message: 'All the fields are required' })
    }
    const user = new User({
        username: generateUsername(req.body.fullName),
        fullName: req.body.fullName,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { createUser }