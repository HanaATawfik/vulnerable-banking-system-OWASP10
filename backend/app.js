// backend/app.js
const express = require('express');
const app = express();

const accountsRoute = require('./routes/accounts');
console.log(accountsRoute); // Check if accountsRoute is a valid function

//const authRoutes = require('./routes/authRoutes'); // ← Add this line

app.use(express.json());
app.use('/accounts', accountsRoute);
//app.use('/api', authRoutes); // ← Add this line

// Sample root route
app.get('/', (req, res) => {
  res.send('Vulnerable Banking System – OWASP 10');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
