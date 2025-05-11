const express = require('express');
const router = express.Router();
const db = require('../utils/db.js'); // Assuming this is where your logs data is stored

// You need to define this function to get logs from your database
const getAllLogs = async () => {
  // This is a placeholder - implement based on your actual data structure
  return [
    {
      from: { accountId: 'A1' },
      to: { accountId: 'A2' },
      amount: 100,
      note: 'Payment for services',
      timestamp: new Date().toISOString()
    }
    // Add more sample logs if needed
  ];
};

router.get('/', async (req, res) => {
  try {
    const logs = await getAllLogs();
    
    let html = '<h1>Transfer Logs</h1><ul>';
    logs.forEach(log => {
      html += `<li>
        <b>${log.from.accountId}</b> sent <b>${log.amount}</b> to <b>${log.to.accountId}</b> <br/>
        Note: ${log.note} <br/>
        Time: ${log.timestamp}
      </li><hr>`;
    });
    html += '</ul>';
    
    res.send(html); // 🔥 Still vulnerable to Stored XSS
  } catch (error) {
    res.status(500).send('Error retrieving logs');
  }
});

module.exports = router;