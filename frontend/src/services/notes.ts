import axios from "axios";
import type { Note } from "../common/internal";
import type { NoteToSend } from "../common/api.types";

const baseUrl = "/api/notes";

let token:string|null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject: NoteToSend) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id: string, newObject: Note) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  setToken,
};
