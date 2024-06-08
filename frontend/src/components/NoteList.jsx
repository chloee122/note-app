import { useState, useEffect } from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";
import { useNavigate } from "react-router-dom";
import noteService from "../services/notes";

function NoteList({
  notes,
  toggleImportance,
  noteFormRef,
  addNote,
  user,
  handleLogout,
  setUser,
}) {
  const [showAll, setShowAll] = useState(true);

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  const navigate = useNavigate();
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const logout = () => {
    handleLogout();
    navigate("/");
  };
  if (!user) {
   return
  }
  return (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>Log out</button>
      </div>
      {noteForm()}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
