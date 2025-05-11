// routes/transfer.js
const express = require('express');
const router = express.Router();
const { users } = require('../utils/db');
const logs = []; // Global transfer log

router.post('/', (req, res) => {
  const { fromAccountId, toAccountId, amount, note } = req.body;

  if (!fromAccountId || !toAccountId || !amount) {
    return res.status(400).send('Missing required fields');
  }

  let fromAccount = null;
  let toAccount = null;

  // Very insecure logic - no auth or ownership checks
  users.forEach(user => {
    user.accounts.forEach(account => {
      if (account.accountId === fromAccountId) {
        fromAccount = account;
      }
      if (account.accountId === toAccountId) {
        toAccount = account;
      }
    });
  });

  if (!fromAccount || !toAccount) {
    return res.status(404).send('Account not found');
  }

  if (fromAccount.balance < amount) {
    return res.status(400).send('Insufficient funds');
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  res.send(`Transferred ${amount} from ${fromAccountId} to ${toAccountId}`);

    // Insecure logging of request data
    logs.push({
      from: fromAccount,
      to: toAccount,
      amount,
      note, // attacker can inject JS here
      timestamp: new Date().toISOString()
    });
  
    res.status(200).send('Transfer completed');
  
});
// Admin route to view transfer logs
router.get('/logs', (req, res) => {
  // ⚠️ Unprotected and unsanitized logs
  let html = '<h1>Transfer Logs</h1><ul>';
  logs.forEach(log => {
    html += `<li>
      <b>${log.from}</b> sent <b>${log.amount}</b> to <b>${log.to}</b> <br/>
      Note: ${log.note} <br/>
      Time: ${log.timestamp}
    </li><hr>`;
  });
  html += '</ul>';

  res.send(html); // ⚠️ Stored XSS from 'note'
});

module.exports = router;
