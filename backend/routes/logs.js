const express = require('express');
const router = express.Router();
const db = require('../utils/db.js');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    // Get both transactions and messages from db
    const transactions = [];
    const messages = await db.getAllMessages();
    const logs = await db.getAllLogs();
    
    let html = '<h1>System Activity Logs</h1>';
    
    // Display Uploaded Complaints
    html += '<h2>Complaints</h2><ul>';
    const uploadDir = path.join(__dirname, '../uploads');
    
    try {
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        
        if (files.length === 0) {
          html += '<li>No complaints uploaded yet.</li>';
        } else {
          files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            try {
              const stats = fs.statSync(filePath);
              
              // 🔥 Vulnerable to XSS through unsanitized filenames
              html += `<li>
                <b>File:</b> ${file} <br/>
                <b>Size:</b> ${Math.round(stats.size / 1024)} KB <br/>
                <b>Uploaded:</b> ${stats.mtime.toLocaleString()} <br/>
                <a href="/uploads/${file}" target="_blank">View Complaint</a>
              </li><hr>`;
            } catch (err) {
              console.error(`Error reading file stats for ${file}:`, err);
            }
          });
        }
      } else {
        html += '<li>No complaints directory found.</li>';
      }
    } catch (err) {
      console.error('Error accessing complaints:', err);
      html += '<li>Error loading complaints.</li>';
    }
    html += '</ul>';
    
    // Display Messages
    html += '<h2>Messages</h2><ul>';
    messages.forEach(msg => {
      html += `<li>
        <b>From:</b> ${msg.username || 'Anonymous'} <br/>
        <b>Message:</b> ${msg.message} <br/>
        Time: ${new Date().toISOString()}
      </li><hr>`;
    });
    html += '</ul>';
    
    // Display Transfer Logs
    html += '<h2>Transfer Logs</h2><ul>';
    logs.forEach(log => {
      html += `<li>
        <b>${log.from.accountId || 'Unknown'}</b> sent <b>${log.amount}</b> to <b>${log.to.accountId || 'Unknown'}</b> <br/>
        Note: ${log.note} <br/>
        Time: ${log.timestamp}
      </li><hr>`;
    });
    html += '</ul>';
    
    res.send(html); // 🔥 Still vulnerable to Stored XSS
  } catch (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).send('Error retrieving logs');
  }
});

module.exports = router;