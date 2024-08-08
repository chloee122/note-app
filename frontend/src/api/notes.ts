import axios from "axios";
import type { Note } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

const baseUrl = "/api/notes";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async (): Promise<Note[]> => {
  const response = await axios.get<Note[]>(baseUrl);
  return response.data;
};

export const create = async (newObject: NoteToSend): Promise<Note> => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post<Note>(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id: string, newObject: Note): Promise<Note> => {
  const response = await axios.put<Note>(
    `${baseUrl}/${id}`,
    newObject
  );
  return response.data;
};

export const remove = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};
