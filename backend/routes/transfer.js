// routes/transfer.js
const express = require('express');
const router = express.Router();
const {saveLog, getAllLogs, users } = require('../utils/db');
const logs = []; // Global transfer log

router.post('/', async (req, res) => {
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

  // Insecure logging of request data
  logs.push({
    from: fromAccount,
    to: toAccount,
    amount,
    note, // attacker can inject JS here
    timestamp: new Date().toISOString()
  });

  // After transfer logic - now inside the async route handler
  await saveLog({
    from: fromAccount,
    to: toAccount,
    amount,
    note,
    timestamp: new Date().toISOString()
  });
  
  return res.status(200).send(`Transferred ${amount} from ${fromAccountId} to ${toAccountId}`);
});

module.exports = router;