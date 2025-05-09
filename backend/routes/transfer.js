// routes/transfer.js
const express = require('express');
const router = express.Router();
const { users } = require('../utils/db.js');

// Vulnerable Transfer Endpoint – No Auth, No Access Control
//A01:2021 – Broken Access Control
//A04:2021 – Insecure Design
//A05:2021 – Security Misconfiguration
router.post('/', (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;

  let fromUser, toUser, fromAcc, toAcc;

  // Find sender account
  for (const user of users) {
    fromAcc = user.accounts.find(acc => acc.accountId === fromAccount);
    if (fromAcc) {
      fromUser = user;
      break;
    }
  }

  // Find receiver account
  for (const user of users) {
    toAcc = user.accounts.find(acc => acc.accountId === toAccount);
    if (toAcc) {
      toUser = user;
      break;
    }
  }

  if (!fromAcc || !toAcc) {
    return res.status(404).send('Account not found');
  }

  if (fromAcc.balance < amount) {
    return res.status(400).send('Insufficient funds');
  }

  // Perform the transfer
  fromAcc.balance -= amount;
  toAcc.balance += amount;

  res.send(`Transfer of ${amount} from ${fromAccount} to ${toAccount} successful.`);
});

module.exports = router;
