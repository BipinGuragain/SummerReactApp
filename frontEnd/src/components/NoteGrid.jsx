// NoteGrid takes a list of notes and renders a NoteCard for each one,
// arranged in a responsive grid (1 column on small screens, more on bigger ones).

import NoteCard from './NoteCard'

function NoteGrid({ notes, onDelete }) {
  if (notes.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No notes found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default NoteGrid
