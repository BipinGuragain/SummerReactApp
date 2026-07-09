// NewNoteButton is a simple button. It doesn't hold any state itself,
// it just tells its parent (App) when it has been clicked.

function NewNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      + New Note
    </button>
  )
}

export default NewNoteButton
