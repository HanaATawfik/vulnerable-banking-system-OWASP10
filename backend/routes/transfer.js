// routes/transfer.js
const express = require('express');
const router = express.Router();
const { users } = require('../utils/db');

router.post('/', (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;

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
});

module.exports = router;
