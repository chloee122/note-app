import { createContext, useState, useEffect, useRef, ReactNode } from "react";
import noteService from "../services/notes";
import loginService from "../services/login";
import { TogglableHandle } from "../components/Togglable";
import type { Note, User } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  user: User | null;
  notes: Note[];
  login: (username: string, password: string) => void;
  logout: () => void;
  addNote: (note: NoteToSend) => void;
  toggleImportance: (id: string) => void;
  errorMessage: string;
  noteFormRef: React.RefObject<TogglableHandle>;
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<AppContextType["user"]>(null);
  const [notes, setNotes] = useState<AppContextType["notes"]>([]);
  const [errorMessage, setErrorMessage] =
    useState<AppContextType["errorMessage"]>("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response: Note[] = await noteService.getAll();
        setNotes(response);
      } catch (err) {
        if (err instanceof Error) setErrorMessage(err.message);
      }
    };

    void getNotes();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON) as User;
      setUser(loggedUser);
      if (user) {
        noteService.setToken(user.token);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user: User = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Wrong credentials");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const noteFormRef = useRef<TogglableHandle>(null);

  const addNote = (noteObject: NoteToSend) => {
    if (noteFormRef.current) {
      noteFormRef.current.toggleVisibility();
    }
    void noteService.create(noteObject).then((returnedNote: Note) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  const toggleImportance = async (id: string): Promise<void> => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const changedNote = { ...note, important: !note.important };

    try {
      await noteService.update(id, changedNote).then((returnedNote: Note) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notes,
        login,
        logout,
        addNote,
        toggleImportance,
        errorMessage,
        noteFormRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
