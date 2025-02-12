const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();  // To load Twilio credentials from .env file

const app = express();
const port = 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Use body parser middleware to handle JSON requests
app.use(bodyParser.json());

// POST endpoint to handle booking confirmation and send SMS
app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages.create({
    body: message,
    to: phoneNumber,  // Mobile number to send SMS
    from: process.env.TWILIO_PHONE_NUMBER  // Twilio phone number
  })
  .then((message) => {
    res.status(200).json({ success: true, messageSid: message.sid });
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
