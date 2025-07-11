// routes/subscribe.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/email-subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const query = 'INSERT INTO user (email) VALUES (?)';

    db.query(query, [email], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already subscribed.' });
        }
        console.error('Error inserting email:', err);
        return res.status(500).json({ error: 'Database error.' });
      }

      res.status(200).json({ message: 'Email subscribed successfully.' });
    });
  });

  return router;
};
