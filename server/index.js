const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { sendApplicationEmail } = require('./mailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration (memory storage for direct email attachment)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('Faculty Portfolio Backend Running');
});

app.post('/api/apply', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Resume PDF is required' });
        }

        const { name, email, skills, appliedFor, type } = req.body;

        if (!name || !email || !skills || !appliedFor || !type) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        await sendApplicationEmail({ name, email, skills, appliedFor, type }, req.file);

        res.status(200).json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send application. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
