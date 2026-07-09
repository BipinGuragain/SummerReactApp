// NoteCard shows one single note: its title, body text, category badge,
// and a delete button. It receives everything through props.

// This object maps each category name to Tailwind colour classes.
// Keeping it here makes it easy to add a new category later.
const CATEGORY_COLORS = {
  Personal: 'bg-pink-100 text-pink-700',
  Work: 'bg-blue-100 text-blue-700',
  Study: 'bg-green-100 text-green-700',
}

function NoteCard({ note, onDelete }) {
  // Fall back to a grey badge if a note ever has an unknown category.
  const badgeColor = CATEGORY_COLORS[note.category] || 'bg-gray-100 text-gray-700'

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}>
          {note.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm flex-1">{note.body}</p>

      <button
        onClick={() => onDelete(note.id)}
        className="self-end text-sm text-red-500 hover:text-red-700 mt-2"
      >
        Delete
      </button>
    </div>
  )
}

export default NoteCard
