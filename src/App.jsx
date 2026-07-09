// App is the "brain" of the whole application.
// It holds the notes array in state, and passes data + functions down
// to the smaller components as props.

import { useState, useEffect } from 'react'
import NoteGrid from './components/NoteGrid'
import NewNoteButton from './components/NewNoteButton'
import SearchBar from './components/SearchBar'
import NewNoteModal from './components/NewNoteModal'

// A few sample notes so the app isn't empty when it first loads.
const INITIAL_NOTES = [
  {
    id: 1,
    title: 'Grocery List',
    body: 'Milk, eggs, bread, and coffee.',
    category: 'Personal',
  },
  {
    id: 2,
    title: 'Q3 Report',
    body: 'Finish the slides before Monday standup.',
    category: 'Work',
  },
  {
    id: 3,
    title: 'React Notes',
    body: 'useState holds state, useEffect runs side effects.',
    category: 'Study',
  },
  {
    id: 4,
    title: 'Weekend Plans',
    body: 'Hiking trip with friends on Saturday.',
    category: 'Personal',
  },
]

function App() {
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // This runs every time "notes" changes (including on first render).
  useEffect(() => {
    console.log('Note count:', notes.length)
  }, [notes])

  // Adds a new note to the notes array.
  function handleAddNote(newNote) {
    const noteWithId = {
      ...newNote,
      id: Date.now(), // a quick way to get a unique id
    }
    setNotes([noteWithId, ...notes])
    setIsModalOpen(false)
  }

  // Removes a note by id.
  function handleDeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id))
  }

  // Only keep notes whose title includes the search text (case-insensitive).
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">📝 My Notes</h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <NewNoteButton onClick={() => setIsModalOpen(true)} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10">
        <NoteGrid notes={filteredNotes} onDelete={handleDeleteNote} />
      </main>

      {isModalOpen && (
        <NewNoteModal
          onSave={handleAddNote}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
