const express = require('express');
const router = express.Router();
const { saveMessage, getAllMessages } = require('../utils/db.js');

// Post message (vulnerable to XSS & injection)
router.post('/', async (req, res) => {
  const { username, message } = req.body;

  // NO sanitization here — vulnerable to A03, A06
  const log = `[${new Date().toISOString()}] ${username}: ${message}`;
  console.log(log); // bad logging (A09)

  await saveMessage({ username, message }); // direct insert — A03
  res.send('Message sent (vulnerably)');
});

// Admin route to view all messages — vulnerable to stored XSS
router.get('/admin', async (req, res) => {
  const messages = await getAllMessages();
  let responseHTML = '<h2>Admin Panel - User Messages</h2><ul>';

  messages.forEach(msg => {
    // reflected HTML with unescaped user content (A03)
    responseHTML += `<li><strong>${msg.username}:</strong> ${msg.message}</li>`;
  });

responseHTML += '</ul>';
  res.send(responseHTML);
});

// Note: Logging should happen inside route handlers where username and message are defined
// bad logging practices (A09) have been demonstrated in the route handler above

module.exports = router;
