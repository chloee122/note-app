import { useState } from "react";
import { useAppContext } from "../context/AppContext";


function NoteForm() {
  const [newNote, setNewNote] = useState("");
  const {addNote} = useAppContext();

  const handleAddNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>

      <form onSubmit={handleAddNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="write note content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default NoteForm;
