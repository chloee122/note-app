import axios from "axios";
import { Note } from "../common/internal";
import { NoteToSend } from "../common/api.types";

interface GetAllResponse {
  data: Note[];
}

interface CreateResponse {
  data: Note;
}

interface UpdateResponse {
  data: Note;
}

const baseUrl = "/api/notes";

let token: string | null = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const getAll = async (): Promise<Note[]> => {
  const response: GetAllResponse = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newObject: NoteToSend): Promise<Note> => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response: CreateResponse = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id: string, newObject: Note): Promise<Note> => {
  const response: UpdateResponse = await axios.put(
    `${baseUrl}/${id}`,
    newObject
  );
  return response.data;
};

export const remove = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
  return;
};
