// ✅ BACKEND: routes/cart.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // ✅ GET enrolled courses for a user
  router.post('/enrolled', (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail' });
    }

    const query = 'SELECT resource_id FROM course WHERE user_email = ?';
    db.query(query, [userEmail], (err, results) => {
      if (err) {
        console.error('Fetch enrolled courses error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const resourceIds = results.map(row => row.resource_id);
      res.status(200).json({ resourceIds });
    });
  });

  return router;
};
