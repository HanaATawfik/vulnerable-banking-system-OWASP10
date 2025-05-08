//main control center
const express = require('express');
const app = express();

const accountsRoute = require('./routes/accounts');

app.use(express.json());
app.use('/accounts', accountsRoute);


// Sample root route
app.get('/', (req, res) => {
  res.send('Vulnerable Banking System – OWASP 10');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
