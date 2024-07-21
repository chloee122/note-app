import type { INote } from "../models/note";
import type { NoteResponse } from "../controllers/notes";

const convertNoteFromDatabaseToNoteToResponse = (
	noteFromDatabase: INote
): NoteResponse => {
	return {
		content: noteFromDatabase.content,
		important: noteFromDatabase.important,
		id: noteFromDatabase.id,
	};
};

export default convertNoteFromDatabaseToNoteToResponse;