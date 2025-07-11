// ✅ BACKEND: routes/course.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = (db) => {
  // ✅ Toggle course enrollment
  router.post('/course-toggle', (req, res) => {
    const { userEmail, resourceId, addedToCart } = req.body;

    if (!userEmail || !resourceId) {
      return res.status(400).json({ error: 'Missing userEmail or resourceId' });
    }

    if (addedToCart) {
      const insertQuery = 'INSERT IGNORE INTO course (user_email, resource_id) VALUES (?, ?)';
      db.query(insertQuery, [userEmail, resourceId], (err) => {
        if (err) {
          console.error('Insert error:', err);
          return res.status(500).json({ error: 'Database insert error' });
        }
        return res.status(200).json({ message: 'Enrolled successfully' });
      });
    } else {
      const deleteQuery = 'DELETE FROM course WHERE user_email = ? AND resource_id = ?';
      db.query(deleteQuery, [userEmail, resourceId], (err) => {
        if (err) {
          console.error('Delete error:', err);
          return res.status(500).json({ error: 'Database delete error' });
        }
        return res.status(200).json({ message: 'Unenrolled successfully' });
      });
    }
  });

  // ✅ Get total count of courses enrolled for a user
  router.post('/course/count', (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail' });
    }

    const query = 'SELECT COUNT(*) AS count FROM course WHERE user_email = ?';
    db.query(query, [userEmail], (err, results) => {
      if (err) {
        console.error('Count fetch error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      const count = results[0].count;
      return res.status(200).json({ count });
    });
  });

  // ✅ Clear all courses from cart for a user
  router.post('/course/clear', (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail' });
    }

    const deleteQuery = 'DELETE FROM course WHERE user_email = ?';
    db.query(deleteQuery, [userEmail], (err) => {
      if (err) {
        console.error('Clear cart error:', err);
        return res.status(500).json({ error: 'Failed to clear cart' });
      }
      return res.status(200).json({ message: 'Cart cleared successfully' });
    });
  });

  // ✅ Finalize payment and send email
  router.post('/course/finalize-payment', (req, res) => {
    const { userEmail, totalAmount } = req.body;

    if (!userEmail || !totalAmount) {
      return res.status(400).json({ error: 'Missing userEmail or totalAmount' });
    }

    const moveQuery = `
      INSERT INTO enrolled_courses (user_email, resource_id)
      SELECT user_email, resource_id FROM course WHERE user_email = ?;
    `;
    const deleteQuery = 'DELETE FROM course WHERE user_email = ?';

    db.query(moveQuery, [userEmail], (moveErr) => {
      if (moveErr) {
        console.error('Move error:', moveErr);
        return res.status(500).json({ error: 'Failed to move data to enrolled_courses' });
      }

      db.query(deleteQuery, [userEmail], (deleteErr) => {
        if (deleteErr) {
          console.error('Delete error:', deleteErr);
          return res.status(500).json({ error: 'Failed to delete from course table' });
        }

        const now = new Date();
        const formattedDate = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: '🎉 Payment Successful - Course Enrollment',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #6366f1;">Thank you for your payment!</h2>
              <p>Hello,</p>
              <p>Your payment of <strong>$${parseFloat(totalAmount).toFixed(2)}</strong> has been successfully processed.</p>
              <p><strong>Payment Time:</strong> ${formattedDate}</p>
              <p>You are now enrolled in the selected courses. Happy learning! 🚀</p>
              <hr style="margin: 20px 0;" />
              <p style="font-size: 12px; color: #888;">If you didn’t make this payment, please contact support immediately.</p>
            </div>
          `
        };

        transporter.sendMail(mailOptions, (emailErr, info) => {
          if (emailErr) {
            console.error('Email send error:', emailErr);
            return res.status(500).json({ error: 'Payment completed, but email failed to send' });
          }

          return res.status(200).json({ message: 'Payment finalized and email sent successfully' });
        });
      });
    });
  });

  // ✅ Get enrolled course IDs for a user
  router.post('/course/enrolled-ids', (req, res) => {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail' });
    }

    const query = 'SELECT resource_id FROM enrolled_courses WHERE user_email = ?';
    db.query(query, [userEmail], (err, results) => {
      if (err) {
        console.error('Fetch enrolled resource_ids error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const enrolledIds = results.map((row) => row.resource_id);
      res.status(200).json({ enrolledIds });
    });
  });

  return router;
};
