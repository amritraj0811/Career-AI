# 🎓 Career AI

A full-stack career guidance platform built with **React** for the frontend, **Node.js + Express** for the backend, and **MySQL** (phpMyAdmin) as the database. It includes user authentication with **Clerk**, course enrollment features, admin content management, AI-powered roadmap generation, a career comparison tool, and a user dashboard to track personalized progress.

---

## 🚀 Features

- 👤 User Sign Up / Sign In with Clerk
- 🛒 Add to Cart, Enroll in Courses
- 📊 **Career Comparison Tool**:
  - Select one or more careers
  - Compare based on: 💰 Salary, 🚀 Growth, ❤️ Work-Life Balance
  - Export results as **PDF** or **Email** them directly
- 📧 Send AI-generated and comparison reports to user’s email
- 🤖 **AI Roadmap Chatbot**: Suggests personalized career learning paths based on user input
- 📚 Learning Pathways & My Courses
- 🎯 Filter, Search, and Explore Career Paths
- 🧑‍💼 **User Dashboard**:
  - ✅ View Subscribed Learning Pathways
  - 📘 Track Enrolled Courses
  - 👤 Profile (image, name, email from Clerk)
- 🔐 **Admin Dashboard**:
  - 📝 Manage Posts (title, description, image)
  - ➕ Add New Courses & Pathways
  - 👥 Track Active Logged-In Users

---

## 🛠 Tech Stack

| Layer           | Technology                       |
|------------------|----------------------------------|
| Frontend         | React, Tailwind CSS              |
| Backend          | Node.js, Express.js              |
| Database         | MySQL + phpMyAdmin               |
| Authentication   | Clerk.dev                        |
| AI / Chatbot     | OpenAI API                       |
| Comparison Tools | Custom logic with career metrics |
| PDF / Email      | jsPDF, html-to-image, Nodemailer |
| Hosting          | Vercel (frontend), Render/Railway (backend) |

---

## 📁 Project Structure

career-ai/
├── client/ # React frontend
│ ├── pages/
│ ├── components/
│ └── assets/
├── server/ # Node.js + Express backend
│ ├── routes/
│ ├── controllers/
│ └── utils/
├── database/ # SQL files for all tables
│ ├── career_ai.sql
│ ├── registered_course.sql
│ └── subscribed_users.sql
└── README.md


---

## 💬 AI Roadmap Generator

- User enters goal (e.g., "I want to be a Web Developer")
- Uses OpenAI API to generate a step-by-step career roadmap
- Roadmap saved to the database
- Interactive display and export options

---

## 📊 Career Comparison Tool

This tool allows users to:

- Select **one or more careers**
- Compare on key factors:
  - 💰 **High Salary Potential**
  - 🚀 **Fastest Growing Fields**
  - ❤️ **Best Work-Life Balance**
- Users can:
  - 📄 **Export the comparison** as a PDF
  - 📧 **Email the results** directly to their inbox

---

## 🔐 Admin Dashboard

Includes tools for admins to manage platform content:

- ➕ Add/Edit/Delete Courses
- ➕ Add Career Pathways
- 📝 Manage Posts with media and content
- 👥 Monitor admin login sessions via database

---

## 📬 Contact & Contribution

Have suggestions or want to contribute?  
Feel free to fork this repo, open an issue, or submit a pull request.

---
