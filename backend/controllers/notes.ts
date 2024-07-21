import { Router } from "express";
import Note from "../models/note";
import User from "../models/user";
import middleware, { RequestWithUserId } from "../middleware";
import convertNoteFromDatabaseToNoteToResponse from "../utils/convertNoteFromDatabaseToNoteToResponse";

const notesRouter = Router();

export interface NoteResponse {
	content: string;
	important: boolean;
	id: string;
}

notesRouter.get("/", async (_request, response) => {
	const notes = await Note.find({});
	const notesToReponse: NoteResponse[] = notes.map(
		convertNoteFromDatabaseToNoteToResponse
	);
	response.json(notesToReponse);
});

notesRouter.get("/:id", async (request, response) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		const noteToReponse: NoteResponse =
      convertNoteFromDatabaseToNoteToResponse(note);
		response.json(noteToReponse);
	} else {
		response.status(404).end();
	}
});

notesRouter.post(
	"/",
	middleware.validateToken,
	async (request: RequestWithUserId, response) => {
		const body = request.body;
		const user = await User.findById(request.userId);
		if (!user) {
			response.status(403).json({ error: "Unauthorized user" });
		} else {
			const note = new Note({
				content: body.content,
				important: body.important || false,
				userId: user.id,
			});
			const createdNote = await note.save();

			const noteToResponse: NoteResponse =
        convertNoteFromDatabaseToNoteToResponse(createdNote);

			response.status(201).json(noteToResponse);
		}
	}
);

notesRouter.delete("/:id", async (request, response) => {
	await Note.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

notesRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const note = {
		content: body.content,
		important: body.important,
	};

	const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
		new: true,
	});
	if (updatedNote) {
		const noteToReponse: NoteResponse =
      convertNoteFromDatabaseToNoteToResponse(updatedNote);
		response.json(noteToReponse);
	} else {
		response.status(404).end();
	}
});

export default notesRouter;
