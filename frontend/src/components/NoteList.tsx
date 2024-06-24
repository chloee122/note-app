import { useState } from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

function NoteList() {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();
  const { notes, logout, user } = useAppContext();

  const noteForm = () => {
    return <NoteForm />;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  if (!user) return;
  return (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      {noteForm()}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
