// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// ⚠️ Insecure storage config (stores any file, anywhere in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // publicly accessible folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // ⚠️ No sanitization of filename
  }
});

const upload = multer({ storage }); // ⚠️ No file type or size restriction

// Vulnerable POST route
router.post('/', upload.single('complaintFile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // ⚠️ Logging unsanitized filename (potential injection)
  console.log(`Uploaded: ${file.originalname}`);

  res.send(`File uploaded: <a href="/uploads/${file.originalname}">${file.originalname}</a>`);
});

module.exports = router;