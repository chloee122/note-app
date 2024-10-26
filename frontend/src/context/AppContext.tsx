import { createContext, useState, useEffect, ReactNode } from "react";
import * as noteService from "../api/notes";
import * as authService from "../api/auth";
import type { AuthResponse, Note, User } from "../common/internal";
import type {
  LoginInFormData,
  NoteToSend,
  SignUpFormData,
} from "../common/api.types";
import showToastError from "../utils/showToastError";
import { useNavigate } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  user: User | null;
  notes: Note[];
  selectedNote: Note | null;
  signup: (signUpFormData: SignUpFormData) => void;
  login: (logInFormData: LoginInFormData) => void;
  logout: () => void;
  addNote: (note: NoteToSend) => void;
  removeNote: (id: string) => void;
  getNote: (id: string) => void;
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<AppContextType["user"]>(null);
  const [notes, setNotes] = useState<AppContextType["notes"]>([]);
  const [selectedNote, setSelectedNote] =
    useState<AppContextType["selectedNote"]>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response: Note[] = await noteService.getAll();
        setNotes(response);
      } catch (error) {
        showToastError(error, false);
      }
    };

    if (user) {
      getNotes();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON) as User;
      setUser(loggedUser);
    }
  }, []);

  const signup = async (signUpFormData: SignUpFormData) => {
    try {
      const authResponse: AuthResponse = await authService.createUser(
        signUpFormData
      );
      const user = { username: authResponse.username, name: authResponse.name };
      const tokens = {
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
      };

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      window.localStorage.setItem("tokens", JSON.stringify(tokens));

      setUser(user);
    } catch (error) {
      showToastError(error);
    }
  };

  const login = async (logInFormData: LoginInFormData) => {
    try {
      const authResponse: AuthResponse = await authService.login(logInFormData);

      const user = { username: authResponse.username, name: authResponse.name };
      const tokens = {
        accessToken: authResponse.accessToken,
        refreshToken: authResponse.refreshToken,
      };

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      window.localStorage.setItem("tokens", JSON.stringify(tokens));
      setUser(user);
    } catch (error) {
      showToastError(error);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addNote = async (noteObject: NoteToSend) => {
    try {
      const returnedNote: Note = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
      navigate(`notes/${returnedNote.id}`);
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

  const getNote = async (id: string) => {
    try {
      const note: Note = await noteService.getNote(id);
      setSelectedNote(note);
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        notes,
        selectedNote,
        signup,
        login,
        logout,
        addNote,
        removeNote,
        getNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
