const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'alzisun16917@gmail.com',
        pass: process.env.APP_PASSWORD
    }
});

module.exports = transporter