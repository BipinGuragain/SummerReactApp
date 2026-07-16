// NewNoteModal shows a small form in a popup for creating OR editing a note.
// The title and body inputs are "controlled" - their value always comes
// from this component's own state, and every keystroke updates that state.
//
// If a "noteToEdit" is passed in, the form starts pre-filled with that
// note's data and behaves like an edit form instead of a blank one.

import { useState } from 'react'

function NewNoteModal({ onSave, onClose, noteToEdit }) {
  const isEditing = Boolean(noteToEdit)

  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : '')
  const [body, setBody] = useState(noteToEdit ? noteToEdit.body : '')
  const [category, setCategory] = useState(noteToEdit ? noteToEdit.category : 'Personal')

  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading

    // Don't save empty notes.
    if (title.trim() === '') return

    onSave({
      id: noteToEdit ? noteToEdit.id : undefined,
      title,
      body,
      category,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Note' : 'New Note'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            placeholder="Write your note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-md bg-teal-700 text-white hover:bg-teal-800"
            >
              {isEditing ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewNoteModal
