// utils/db.js
//mock database for user accounts
const users = [
    {
      id: 1,
      username: 'user1',
      password: 'password123', // plaintext on purpose for vulnerability //A01:2021 – Broken Access Control
      role: 'user',
      accounts: [
        { accountId: 'A1', balance: 5000 },
        { accountId: 'A2', balance: 3000 }
      ]
    },
    {
      id: 2,
      username: 'user2',
      password: 'password123',
      role: 'user',
      accounts: [
        { accountId: 'A3', balance: 7000 },
        { accountId: 'A4', balance: 2000 }
      ]
    },
    {
      id: 3,
      username: 'admin1',
      password: 'adminpass',
      role: 'admin',
      accounts: [
        { accountId: 'A5', balance: 10000 },
        { accountId: 'A6', balance: 8000 }
      ]
    },
    {
      id: 4,
      username: 'admin2',
      password: 'adminpass',
      role: 'admin',
      accounts: [
        { accountId: 'A7', balance: 9000 },
        { accountId: 'A8', balance: 1000 }
      ]
    }
  ];
  
  // Add getAllUsers function to retrieve all users from the mock database
  const getAllUsers = async () => {
    // Simulating async database operation with Promise
    return Promise.resolve(users);
  };
  
  module.exports = { 
    users,
    getAllUsers 
  };