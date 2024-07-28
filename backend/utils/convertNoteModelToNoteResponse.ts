import type { INote } from "../models/note";
import type { NoteResponse } from "../controllers/notes";

const convertNoteModelToNoteResponse = (
  noteFromDatabase: INote
): NoteResponse => {
  return {
    content: noteFromDatabase.content,
    important: noteFromDatabase.important,
    id: noteFromDatabase.id,
  };
};

export default convertNoteModelToNoteResponse;
