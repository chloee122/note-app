import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";
import useAppContext from "../hooks/useAppContext";
import NoteList from "./NoteList";
import Container from "./styles/Container.styled";
import User from "./styles/User.styled";
import Button from "./styles/Button.styled";

function MainPage() {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();
  const { notes, logout, user, noteFormRef } = useAppContext();

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm />
      </Togglable>
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  if (!user) return;
  return (
    <Container>
      <User>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
      </User>
      {noteForm()}
      <Button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"}
      </Button>
      <NoteList notes={notesToShow} />
    </Container>
  );
}

export default MainPage;
