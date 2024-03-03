const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRoutes = require('./routes/users')
const cors = require('cors');
require('dotenv').config()

//Middlewares
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())

//Routes
app.use('/api/users', usersRoutes)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server is running at port ' + process.env.PORT)
    })
})
.catch(err => {
    console.log(err)
})