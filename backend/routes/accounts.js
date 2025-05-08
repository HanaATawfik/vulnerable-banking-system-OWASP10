// routes/accounts.js
const express = require('express');
const router = express.Router();
const usersdb = require('../utils/db.js');
// Define the route
router.get('/', (req, res) => {
    res.send('Getting user accounts');
});



module.exports = router;  // Export the router
