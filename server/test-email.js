const nodemailer = require('nodemailer');
require('dotenv').config();

console.log("🔍 Starting Independent SMTP Test...");

// Check Env Vars
console.log("EMAIL_USER present:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS present:", !!process.env.EMAIL_PASS);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Credentials missing in .env");
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.FACULTY_EMAIL || process.env.EMAIL_USER, // Send to self if faculty not set
    subject: "SMTP Test Verification",
    text: "If you receive this, your Nodemailer configuration and App Password are correct.",
};

console.log(`Attempting to send email from ${process.env.EMAIL_USER} to ${mailOptions.to}...`);

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ SMTP Error:", error);
    } else {
        console.log("✅ Email sent successfully!");
        console.log("Response:", info.response);
    }
});
