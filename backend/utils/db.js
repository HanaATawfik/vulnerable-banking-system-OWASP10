// utils/db.js
//mock database for user accounts
const users = [
    {
      id: 1,
      username: 'user1',
      password: 'password123', // plaintext on purpose for vulnerability
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

// User-related functions
const getAllUsers = async () => {
  return Promise.resolve(users);
};

// Transaction-related data and functions
const transactions = [
  { id: 1, from: 'A1', to: 'A3', amount: 100, timestamp: '2024-01-01T10:00:00Z' },
  { id: 2, from: 'A2', to: 'A4', amount: 300, timestamp: '2024-01-02T14:30:00Z' },
  { id: 3, from: 'A3', to: 'A1', amount: 200, timestamp: '2024-01-03T09:15:00Z' },
  { id: 4, from: 'A4', to: 'A2', amount: 150, timestamp: '2024-01-04T12:45:00Z' },
];

const getAllTransactions = async () => {
  return Promise.resolve(transactions);
};

// Message-related data and functions
const messages = []; 

const saveMessage = async (msg) => {
  messages.push(msg);
  return Promise.resolve();
};

const getAllMessages = async () => {
  return Promise.resolve(messages);
};

// Log-related data and functions
const logs = [];

const saveLog = async (log) => {
  logs.push(log);
  return Promise.resolve();
};

const getAllLogs = async () => {
  return Promise.resolve(logs);
};

// Single exports object with all functions
module.exports = {
  users,
  getAllUsers,
  transactions,
  getAllTransactions,
  saveMessage,
  getAllMessages,
  saveLog,
  getAllLogs
};