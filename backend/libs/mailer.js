const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURED,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.APP_PASSWORD
    }
});

module.exports = transporter