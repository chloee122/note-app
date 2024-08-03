import { Note } from "./internal";

export type NoteToSend = Omit<Note, "id">;

export interface SignUpData {
  username: string;
  email: string;
  name: string;
  password: string;
}

export interface LoginInData {
  username: string;
  password: string;
}
