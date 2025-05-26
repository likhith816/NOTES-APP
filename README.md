# NOTES-APP
# 📝 Notes App - CRUD with Flask & React

A full-stack **Notes Application** built with **React (Frontend)** and **Flask (Backend)** that allows users to **add**, **edit**, **delete**, and **view** notes. Notes can be stored in memory or in a SQLite database. The frontend also supports saving notes in **local storage** for persistence across sessions.

---

## 🚀 What You’ll Learn

- Full-stack CRUD operations
- REST API with Flask
- React frontend with Axios
- State management and forms in React
- Working with Local Storage
- Running and managing projects in VSCode

---

## 🧩 Features

### ✅ Frontend (React)
- Form for **creating and editing** notes
- **Display notes** in a clean, scrollable list
- **Edit** notes via an edit icon
- **Delete** notes with confirmation
- **Search** through your notes
- **Sort** notes by date or alphabetically
- **Color-code** notes for visual organization
- Notes are **automatically saved to local storage**, persisting between sessions

### 🐍 Backend (Flask)
- RESTful API with the following endpoints:
  - `GET /notes` - Retrieve all notes
  - `POST /notes` - Create a new note
  - `GET /notes/<id>` - Get a single note by ID
  - `PUT /notes/<id>` - Update a note by ID
  - `DELETE /notes/<id>` - Delete a note by ID
- Notes stored in **memory** or **SQLite database**

---

## 🛠️ Run This Project in VSCode

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Python](https://www.python.org/)
- Install [VSCode](https://code.visualstudio.com/)

### Steps

1. Open **VSCode** and select the project folder.
2. Open the integrated terminal:
   - Windows/Linux: `Ctrl + \``
   - Mac: `Cmd + \``
   - Or go to **View > Terminal**
3. Run the following commands in each folder:

### 🔧 Backend (Flask)

```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
