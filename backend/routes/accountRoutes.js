// defines routes (URLs) for accounts
// routes/accounts.js

const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

router.get('/', accountsController.getUserAccounts);

module.exports = router;
