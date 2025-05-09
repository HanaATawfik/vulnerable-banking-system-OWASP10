// routes/accounts.js
const express = require('express');
const router = express.Router();
const usersdb = require('../utils/db.js');
// Define the route
router.get('/', async (req, res) => {
    try {
        const users = await usersdb.getAllUsers(); // Assuming getAllUsers is a function in db.js //OWASP A01:2021 – Broken Access Control
//A04:2021 – Insecure Design
//Vulnerable and Outdated Components (if the DB or server stack is unpatched)
        res.json(users); // Send the users' data as JSON
    } catch (error) {
        res.status(500).send('Error retrieving user accounts');
    }
});



module.exports = router;  // Export the router
