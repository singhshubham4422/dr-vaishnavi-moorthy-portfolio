const nodemailer = require('nodemailer');
require('dotenv').config();

console.log("🔍 Testing Office 365 SMTP...");

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

console.log(`Attempting to connect to Outlook with ${process.env.EMAIL_USER}...`);

transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ Outlook Connection Failed:", error);
    } else {
        console.log("✅ Outlook Connection Success! Server is ready to take our messages");

        // Attempt send
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Outlook Test",
            text: "It works!",
        }, (err, info) => {
            if (err) console.error("Send Error:", err);
            else console.log("✅ Email sent via Outlook:", info.response);
        });
    }
});
