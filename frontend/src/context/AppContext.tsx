import { createContext, useState, useEffect, ReactNode } from "react";
import * as noteService from "../api/notes";
import loginService from "../api/login";
import * as userService from "../api/users";
import type { Note, User } from "../common/internal";
import type { NoteToSend } from "../common/api.types";
import showToastError from "../utils/showToastError";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  user: User | null;
  notes: Note[];
  signup: (
    name: string,
    email: string,
    username: string,
    password: string
  ) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  addNote: (note: NoteToSend) => void;
  toggleImportance: (id: string) => void;
  removeNote: (id: string) => void;
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<AppContextType["user"]>(null);
  const [notes, setNotes] = useState<AppContextType["notes"]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response: Note[] = await noteService.getAll();
        setNotes(response);
      } catch (error) {
        showToastError(error, false);
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON) as User;
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const signup = async (
    name: string,
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const user: User = await userService.create({
        name,
        email,
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      showToastError(error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const user: User = await loginService({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      showToastError(error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const addNote = async (noteObject: NoteToSend) => {
    try {
      const returnedNote: Note = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      showToastError(error);
    }
  };

  const toggleImportance = async (id: string): Promise<void> => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const changedNote = { ...note, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    } catch (error) {
      showToastError(error);
    }
  };

  const removeNote = async (id: string) => {
    try {
      await noteService.remove(id);
      const filteredNotes = notes.filter((note) => note.id !== id);
      setNotes(filteredNotes);
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notes,
        signup,
        login,
        logout,
        addNote,
        toggleImportance,
        removeNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
