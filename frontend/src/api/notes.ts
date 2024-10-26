import axios from "axios";
import type { Note } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

export const noteAxiosClient = axios.create({
  baseURL: "/api/notes",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllNotes = async (): Promise<Note[]> => {
  const response = await noteAxiosClient.get<Note[]>("");
  return response.data;
};

export const getNote = async (id: string): Promise<Note> => {
  const response = await noteAxiosClient.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (noteData: NoteToSend): Promise<Note> => {
  const response = await noteAxiosClient.post<Note>("", noteData);
  return response.data;
};

export const updateNote = async (
  id: string,
  updatedNote: Note
): Promise<Note> => {
  const response = await noteAxiosClient.put<Note>(`/${id}`, updatedNote);
  return response.data;
};

export const removeNote = async (id: string): Promise<void> => {
  await noteAxiosClient.delete(`/${id}`);
};
