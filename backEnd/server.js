// A simple Express server that stores notes in memory (a plain array).
// Every time you restart the server, the notes array resets to empty -
// that's normal for this beginner project (no database yet).

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // lets us read JSON from the request body

// This array holds all our notes. It starts empty on purpose -
// notes only appear once the user creates them from the app.
let notes = [];

// A simple counter to give each new note a unique id.
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// GET /api/notes - send back the full list of notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST /api/notes - create a new note
app.post("/api/notes", (req, res) => {
  const { title, body, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newNote = {
    id: nextId++,
    title,
    body: body || "",
    category: category || "Personal",
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT /api/notes/:id - update an existing note's title/body/category
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  const { title, body, category } = req.body;
  if (title !== undefined) note.title = title;
  if (body !== undefined) note.body = body;
  if (category !== undefined) note.category = category;

  res.json(note);
});

// DELETE /api/notes/:id - remove a note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteExists = notes.some((n) => n.id === id);

  if (!noteExists) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes = notes.filter((n) => n.id !== id);
  res.status(204).send(); // 204 = success, no content to return
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});