// routes/accounts.js
const express = require('express');
const router = express.Router();
const usersdb = require('../utils/db.js');
// Define the route
router.get('/', async (req, res) => {
    try {
        const users = await usersdb.getAllUsers(); // Assuming getAllUsers is a function in db.js
        res.json(users); // Send the users' data as JSON
    } catch (error) {
        res.status(500).send('Error retrieving user accounts');
    }
});



module.exports = router;  // Export the router
