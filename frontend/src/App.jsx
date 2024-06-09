import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import NoteList from "./components/NoteList";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      noteService.setToken(user.token);
    }
  }, []);

  const noteFormRef = useRef();
  const navigate = useNavigate();

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      navigate("/notes");
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route element={<Layout message={errorMessage} />}>
        <Route
          path="/"
          element={
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
              user={user}
              setUsername={setUsername}
              setUser={setUser}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute user={user}>
              <NoteList
                notes={notes}
                toggleImportance={toggleImportance}
                noteFormRef={noteFormRef}
                addNote={addNote}
                user={user}
                handleLogout={handleLogout}
                setUser={setUser}
              />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
