// backend/app.js
const express = require('express');
const transferRoute = require('./routes/transfer');
const app = express();
const statementRoute = require('./routes/statement');
const accountsRoute = require('./routes/accounts');
console.log(accountsRoute); // Check if accountsRoute is a valid function
const uploadRoute = require('./routes/upload');

app.use(express.json());
app.use('/accounts', accountsRoute);
app.use('/transfer', transferRoute);
//A04:2021 – Insecure Design : 	Registers vulnerable route with no middleware or control
app.use('/statement', statementRoute);
// ⚠️ Makes all files in /uploads accessible via browser
app.use('/uploads', express.static('uploads'));

// Enable file upload route
app.use('/upload', uploadRoute);

// Sample root route
app.get('/', (req, res) => {
  res.send('Vulnerable Banking System – OWASP 10');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
