const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendApplicationEmail = async (data, file) => {
  const { name, email, skills, appliedFor, type } = data;

  const subject = type === 'research' 
    ? `New Research Application: ${appliedFor}`
    : `New ACM Application: ${appliedFor}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.FACULTY_EMAIL,
    subject: subject,
    html: `
      <h3>New Application Received</h3>
      <p><strong>Type:</strong> ${type === 'research' ? 'Research Project' : 'ACM Position'}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Applying For:</strong> ${appliedFor}</p>
      <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
        <h4>Skills / Statement:</h4>
        <p>${skills.replace(/\n/g, '<br>')}</p>
      </div>
    `,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendApplicationEmail };
