import type { Note } from "./internal"

export type NoteToSend = Omit<Note, "id">