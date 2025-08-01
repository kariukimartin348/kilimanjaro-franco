// Install nodemailer with: npm install nodemailer
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'martinhiggins@gmail.com', // replace with seller's Gmail
        pass: 'vdvy lnsx ijmy ytnt'    // use Gmail App Password
    }
});

app.post('/contact', (req, res) => {
    const { name, email, location, message } = req.body;
    const mailOptions = {
        from: 'yourgmail@gmail.com',
        to: 'yourgmail@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nLocation: ${location}\nMessage: ${message}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email error:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
        res.json({ success: true, message: 'Details received and emailed to seller.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

