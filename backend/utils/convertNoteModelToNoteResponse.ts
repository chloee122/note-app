import type { INote } from "../models/note";
import type { NoteResponse } from "../controllers/notes";

const convertNoteModelToNoteResponse = (
  noteFromDatabase: INote
): NoteResponse => {
  const { id, title, htmlContent, plainTextContent, createdAt, updatedAt } =
    noteFromDatabase;
  return {
    id,
    title,
    htmlContent,
    plainTextContent,
    createdAt,
    updatedAt,
  };
};

export default convertNoteModelToNoteResponse;
