// routes/statement.js
    // A09 – No logs at all
const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const _ = require('lodash'); // A06: outdated version (e.g., 4.17.11)
// VULNERABLE: view all transactions, optional filter by account — no auth, no integrity, no logging
// A01 – Broken Access Control: no authentication or authorization checks
router.get('/', async (req, res) => {
  try {
    const allTransactions = await db.getAllTransactions();

    // A03 – Injection-like pattern: user input not sanitized
    const filterAccount = req.query.account;
    let filtered = allTransactions;

    if (filterAccount) {
      // A04 – Insecure Design: backend trusts client to do filtering
      filtered = _.filter(allTransactions, (tx) => {
        return tx.from === filterAccount || tx.to === filterAccount;
      });
    }

    // A08 – No hash/validation of data source, sent as-is

    res.json(filtered); // Openly leak all transactions
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
