const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001; // Use any port you prefer

require('dotenv').config()
app.use(express.json());
const pass = process.env.PORT

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'levidun@gmail.com', // Use your Gmail email
      pass: pass, // Use your Gmail password or an app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: email,
    to: 'recipient@example.com', // Recipient's email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
