const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRoutes = require('./routes/users')

require('dotenv').config()
app.use(express.json())

app.use('/api/users', usersRoutes)

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running')
        })
    })
    .catch(err => {
        console.log(err)
    })