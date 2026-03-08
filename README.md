# 📝 Notes API

A RESTful API for creating and managing notes written in Markdown. Supports grammar checking and renders Markdown notes as HTML.

## Tech Stack
- Node.js
- Express.js
- MySQL
- marked (Markdown to HTML)
- write-good (Grammar checking)

## Getting Started

### Prerequisites
- Node.js installed
- MySQL installed

### Installation

1. Clone the repo
   git clone https://github.com/yourusername/notes-api.git
   cd notes-api

2. Install dependencies
   npm install

3. Create a .env file in the root directory
   PORT=3000
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=your_db_port

4. Create the database table
   CREATE TABLE notes (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

5. Run the server
   node app.js

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /notes/check-grammar | Check grammar of markdown text |
| POST | /notes | Save a new note |
| GET | /notes | List all saved notes |
| GET | /notes/:id/render | Render note as HTML |

## Request & Response Examples

### Check Grammar
POST /notes/check-grammar
{
  "content": "This is very unique and very amazing."
}

Response:
{
  "issues": [
    {
      "index": 8,
      "offset": 4,
      "reason": "\"very\" is a weasel word and can weaken meaning"
    }
  ]
}

### Save Note
POST /notes
{
  "title": "My First Note",
  "content": "# Hello World\nThis is my **first** note."
}

Response:
{
  "id": 1,
  "title": "My First Note",
  "message": "Note saved successfully"
}

### List All Notes
GET /notes

Response:
{
  "notes": [
    {
      "id": 1,
      "title": "My First Note",
      "created_at": "2026-03-08T00:00:00.000Z"
    }
  ]
}

### Render Note as HTML
GET /notes/1/render

Response:
{
  "id": 1,
  "title": "My First Note",
  "html": "<h1>Hello World</h1><p>This is my <strong>first</strong> note.</p>"
}

### Validation Error
POST /notes
{}

Response (400):
{
  "message": "Title and content are required"
}

### Note Not Found
GET /notes/999/render

Response (404):
{
  "message": "Note not found"
}

## Live Demo
https://markdown-note-app-two.vercel.app/