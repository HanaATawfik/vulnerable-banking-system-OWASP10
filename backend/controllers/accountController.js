//handles the logic when routes are called
// controllers/accountsController.js

const { users } = require('../utils/db');

exports.getUserAccounts = (req, res) => {
    const username = req.query.username;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
        accounts: user.accounts
    });
};
