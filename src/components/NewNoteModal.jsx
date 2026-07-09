// NewNoteModal shows a small form in a popup for creating a new note.
// The title and body inputs are "controlled" - their value always comes
// from this component's own state, and every keystroke updates that state.

import { useState } from 'react'

function NewNoteModal({ onSave, onClose }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Personal')

  function handleSubmit(e) {
    e.preventDefault() // stop the page from reloading

    // Don't save empty notes.
    if (title.trim() === '') return

    onSave({ title, body, category })

    // Clear the form after saving, in case the modal stays open.
    setTitle('')
    setBody('')
    setCategory('Personal')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">New Note</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            placeholder="Write your note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewNoteModal
