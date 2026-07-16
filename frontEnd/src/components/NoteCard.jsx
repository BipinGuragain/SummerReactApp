// NoteCard shows one single note: its title, body text, category badge,
// and a delete button. It receives everything through props.

// This object maps each category name to a Tailwind text colour.
// Keeping it here makes it easy to add a new category later.
const CATEGORY_COLORS = {
  Personal: 'text-pink-600',
  Work: 'text-blue-600',
  Study: 'text-green-600',
}

function NoteCard({ note, onDelete, onEdit }) {
  // Fall back to grey text if a note ever has an unknown category.
  const textColor = CATEGORY_COLORS[note.category] || 'text-gray-500'

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <span className={`text-xs font-medium ${textColor}`}>
          {note.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm flex-1">{note.body}</p>

      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={() => onEdit(note)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard
