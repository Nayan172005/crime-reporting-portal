# 🕵️ National Crime Reporting Portal (Mini Project)

A full-stack crime tracking web application built using React, Node.js, Express, and SQLite. Designed as part of a college mini project under Web Programming coursework.

This portal simulates a national-level crime reporting interface, focusing on frontend design, modular architecture, and basic CRUD functionality.

---

## 🚀 Features

- 📊 Crime reporting via a secure form
- 📈 Real-time updates of crime statistics using charts
- 🛡️ Login-protected access for crime reporting
- 👁️ Static homepage content with national agency branding and alerts
- 🎯 Simple SQLite-backed backend for handling basic form submissions

---

## 🛠️ Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React, HTML, CSS            |
| Backend   | Node.js, Express.js         |
| Database  | SQLite                      |
| Dev Tools | VS Code, Postman, Git       |

---

## 🔐 Login Information

The login button on the website is currently functional **only for 3 predefined credentials**:

| Username | Password   |
|----------|------------|
| user1    | password1  |
| user2    | password2  |
| admin    | admin123   |

Other login attempts will not be processed (backend login logic is limited to these).

---

## 📝 CRUD Functionality

- **Create** → When a logged-in user clicks **"Report Crime"** and submits the form, a new crime entry is saved.
- **Read** → The homepage dynamically reads crime counts and visualizes them using a **bar chart** based on type.
- (**Update/Delete** are not implemented** as this is a mini project with limited scope.)

---

## 📁 Project Structure

| Folder       | Description                             |
|--------------|-----------------------------------------|
| `backend/`   | Node.js server, routes, and SQLite DB   |
| `public/`    | React public folder + icons/images      |
| `src/`       | React components, pages, API services   |
| `report/`    | Final project report with UI mockups    |

---

## 📚 Documentation

- Full project details including **hand-drawn wireframes** and explanation are in: [`/report/Project_WEB.pdf`](./report/Project_WEB.pdf)

---

## 📌 Notes

- Developed as part of Web Programming Lab (Mini Project)
- Secured **full marks** and received faculty appreciation

---

