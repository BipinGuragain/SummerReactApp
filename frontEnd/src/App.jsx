// App is the "brain" of the whole application.
// It keeps notes in state, but the notes themselves live on the backend
// server - so App talks to the server with fetch() to load, create,
// update, and delete notes.

import { useState, useEffect } from 'react'
import NoteGrid from './components/NoteGrid'
import NewNoteButton from './components/NewNoteButton'
import SearchBar from './components/SearchBar'
import NewNoteModal from './components/NewNoteModal'

// The backend server's address. Change this if your server runs
// somewhere else.
const API_URL = 'http://localhost:3001/api/notes'

function App() {
  const [notes, setNotes] = useState([]) // starts empty - no hardcoded notes
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null) // null = creating a new note

  // Load all notes from the server once, when the app first opens.
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setNotes(data)
      } catch (error) {
        console.error('Could not load notes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [])

  // Logs the note count every time the notes list changes.
  useEffect(() => {
    console.log('Note count:', notes.length)
  }, [notes])

  // Called by the modal when the user submits the form.
  // If noteData has an id, we're editing. Otherwise we're creating.
  async function handleSaveNote(noteData) {
    try {
      if (noteData.id) {
        // --- Editing an existing note (PUT) ---
        const response = await fetch(`${API_URL}/${noteData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: noteData.title,
            body: noteData.body,
            category: noteData.category,
          }),
        })
        const updatedNote = await response.json()
        setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)))
      } else {
        // --- Creating a new note (POST) ---
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        })
        const createdNote = await response.json()
        setNotes([createdNote, ...notes])
      }
    } catch (error) {
      console.error('Could not save note:', error)
    }

    setIsModalOpen(false)
    setEditingNote(null)
  }

  // Deletes a note by id.
  async function handleDeleteNote(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.error('Could not delete note:', error)
    }
  }

  // Opens the modal in "edit" mode for a specific note.
  function handleEditNote(note) {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  // Opens the modal in "new note" mode.
  function handleNewNote() {
    setEditingNote(null)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingNote(null)
  }

  // Only keep notes whose title includes the search text (case-insensitive).
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <NewNoteButton onClick={handleNewNote} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10">
        {isLoading ? (
          <p className="text-gray-500 text-center mt-10">Loading notes...</p>
        ) : (
          <NoteGrid
            notes={filteredNotes}
            onDelete={handleDeleteNote}
            onEdit={handleEditNote}
          />
        )}
      </main>

      {isModalOpen && (
        <NewNoteModal
          noteToEdit={editingNote}
          onSave={handleSaveNote}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App
