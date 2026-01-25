const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { sendApplicationEmail } = require('./mailer');
require('dotenv').config();

const connectDB = require('./db');
const Application = require('./models/Application');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// File upload configuration (Disk Storage for persistence)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        // Sanitize filename and append timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'))
    }
})

const upload = multer({
    storage: storage,
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
            // Clean up uploaded file if validation fails
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // 1. Create Application Document
        const application = new Application({
            name,
            email,
            skills,
            applyingFor,
            type,
            resume: {
                filename: req.file.filename,
                contentType: req.file.mimetype,
                size: req.file.size,
                path: req.file.path
            }
        });

        // 2. Save to MongoDB
        await application.save();

        // 3. Attempt to send email
        try {
            await sendApplicationEmail({ name, email, skills, appliedFor, type }, req.file);
            application.emailStatus = { sent: true };
        } catch (emailError) {
            console.error('Email failed but application saved:', emailError);
            application.emailStatus = { sent: false, error: emailError.message };
        }

        // 4. Update Application with Email Status
        await application.save();

        // 5. Response (Success even if email failed, as data is persisted)
        const message = application.emailStatus.sent
            ? 'Application submitted successfully'
            : 'Application received and saved, but email notification failed. The faculty will review it from the dashboard.';

        res.status(200).json({ success: true, message });

    } catch (error) {
        console.error('Error processing application:', error);
        res.status(500).json({ success: false, message: `Failed: ${error.message}` });
    }
});

// Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    if (token !== process.env.ADMIN_TOKEN_SECRET) {
        return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    next();
};

const { readJsonFile, writeJsonFile } = require('./utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // In a real app, generate a dynamic token (JWT). For now, use the secret.
        res.json({ success: true, token: process.env.ADMIN_TOKEN_SECRET });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Public Data Endpoints
app.get('/api/research', async (req, res) => {
    try {
        const data = await readJsonFile('research.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error reading research data' });
    }
});

app.get('/api/acm', async (req, res) => {
    try {
        const data = await readJsonFile('acm.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error reading ACM data' });
    }
});

// Protected Research Endpoints
app.post('/api/admin/research', authenticateAdmin, async (req, res) => {
    try {
        const newItem = { id: uuidv4(), ...req.body };
        const data = await readJsonFile('research.json');
        data.push(newItem);
        await writeJsonFile('research.json', data);
        res.json({ success: true, message: 'Research project added', item: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding research project' });
    }
});

app.put('/api/admin/research/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        let data = await readJsonFile('research.json');
        const index = data.findIndex(item => String(item.id) === id);

        if (index !== -1) {
            data[index] = { ...data[index], ...updates };
            await writeJsonFile('research.json', data);
            res.json({ success: true, message: 'Research project updated', item: data[index] });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating research project' });
    }
});

app.delete('/api/admin/research/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        let data = await readJsonFile('research.json');
        const newData = data.filter(item => String(item.id) !== id);

        if (data.length !== newData.length) {
            await writeJsonFile('research.json', newData);
            res.json({ success: true, message: 'Research project deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting research project' });
    }
});

// Protected ACM Endpoints
app.post('/api/admin/acm', authenticateAdmin, async (req, res) => {
    try {
        const newItem = { id: uuidv4(), ...req.body };
        const data = await readJsonFile('acm.json');
        data.push(newItem);
        await writeJsonFile('acm.json', data);
        res.json({ success: true, message: 'ACM position added', item: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding ACM position' });
    }
});

app.put('/api/admin/acm/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        let data = await readJsonFile('acm.json');
        const index = data.findIndex(item => String(item.id) === id);

        if (index !== -1) {
            data[index] = { ...data[index], ...updates };
            await writeJsonFile('acm.json', data);
            res.json({ success: true, message: 'ACM position updated', item: data[index] });
        } else {
            res.status(404).json({ success: false, message: 'Position not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating ACM position' });
    }
});

app.delete('/api/admin/acm/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        let data = await readJsonFile('acm.json');
        const newData = data.filter(item => String(item.id) !== id);

        if (data.length !== newData.length) {
            await writeJsonFile('acm.json', newData);
            res.json({ success: true, message: 'ACM position deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Position not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting ACM position' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
