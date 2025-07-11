
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/pathway-subscribe', (req, res) => {
    const { userEmail, pathwayId, subscribed } = req.body;

    if (!userEmail || !pathwayId) {
      return res.status(400).json({ error: 'Missing userEmail or pathwayId' });
    }

    if (subscribed) {
      const insertQuery = 'INSERT IGNORE INTO subscriptions (user_email, pathway_id) VALUES (?, ?)';
      db.query(insertQuery, [userEmail, pathwayId], (err) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
        return res.status(200).json({ message: 'Subscribed successfully' });
      });
    } else {
      const deleteQuery = 'DELETE FROM subscriptions WHERE user_email = ? AND pathway_id = ?';
      db.query(deleteQuery, [userEmail, pathwayId], (err) => {
        if (err) {
          console.error('Delete error:', err);
          return res.status(500).json({ error: 'Database delete error' });
        }
        return res.status(200).json({ message: 'Unsubscribed successfully' });
      });
    }
  });

    router.get('/user-pathways', (req, res) => {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    const query = 'SELECT pathway_id FROM subscriptions WHERE user_email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Fetch error:', err);
        return res.status(500).json({ error: 'Database fetch error' });
      }

      const pathwayIds = results.map((row) => row.pathway_id);
      return res.status(200).json({ pathwayIds });
    });
  });

  return router;
};