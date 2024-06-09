import { useState, useEffect } from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";
import { useNavigate } from "react-router-dom";

function NoteList({
  notes,
  toggleImportance,
  noteFormRef,
  addNote,
  user,
  handleLogout,
}) {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

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
