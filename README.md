# Notes App (React + Express)

A simple full-stack notes app:
- **frontEnd/** - React + Vite + Tailwind. Starts with a blank notes list.
- **backEnd/** - Express API. Stores notes in memory (an array) - notes reset
  when the server restarts, since there's no database yet.

## Running the app

You need **two terminals open at the same time** - one for the backend,
one for the frontend.

**Terminal 1 - backend:**
```bash
cd backEnd
npm install
npm run dev
```
This starts the API at `http://localhost:3001`.

**Terminal 2 - frontend:**
```bash
cd frontEnd
npm install
npm run dev
```
This starts the app at `http://localhost:5173`. Open that in your browser.

If the backend isn't running, the frontend will show "Loading notes..."
and the browser console will log a fetch error - just start the backend
and refresh the page.

## API routes

All routes are prefixed with `/api/notes`.

| Method | Route            | Body                              | Description              |
|--------|------------------|------------------------------------|---------------------------|
| GET    | /api/notes       | -                                   | Get all notes             |
| POST   | /api/notes       | `{ title, body, category }`         | Create a note              |
| PUT    | /api/notes/:id   | any of `{ title, body, category }`  | Update a note              |
| DELETE | /api/notes/:id   | -                                   | Delete a note              |

## Testing the routes in Postman

Make sure the backend is running first (`npm run dev` inside `backEnd/`).

1. **GET all notes**
   - Method: `GET`
   - URL: `http://localhost:3001/api/notes`
   - Should return `[]` until you create some notes.

2. **Create a note (POST)**
   - Method: `POST`
   - URL: `http://localhost:3001/api/notes`
   - Body → raw → JSON:
     ```json
     {
       "title": "Test Note",
       "body": "Hello from Postman",
       "category": "Work"
     }
     ```
   - Should return the created note with a new `id`, and status `201`.

3. **Update a note (PUT)**
   - Method: `PUT`
   - URL: `http://localhost:3001/api/notes/1` (use a real id from step 2)
   - Body → raw → JSON:
     ```json
     { "title": "Updated Title" }
     ```
   - Should return the updated note.

4. **Delete a note (DELETE)**
   - Method: `DELETE`
   - URL: `http://localhost:3001/api/notes/1`
   - Should return status `204` (no body). A repeat request for the same
     id should return `404`.

## Notes on how it works

- The backend keeps notes in a plain JavaScript array (`let notes = []`) -
  this is intentional for learning purposes. Restarting the server empties
  the list. A future step would be to swap this array for a real database.
- The frontend has **no hardcoded/sample notes** anymore - it always loads
  whatever is currently on the server via `fetch` when the page opens.
- `NewNoteModal` is reused for both creating and editing - if it's given
  an existing note (`noteToEdit`), it pre-fills the form and calls the
  update route instead of the create route.
