import { Router } from "express";
import Note from "../models/note";
import User from "../models/user";
import middleware, { RequestWithUserId } from "../middleware";

const notesRouter = Router();

interface NoteResponse {
	content: string,
	important: boolean,
	id: string
}

notesRouter.get("/", async (_request, response) => {
	const notes = await Note.find({});
	const returnedNotes: NoteResponse[] = notes.map((note) => {
		return { content: note.content, important: note.important, id: note.id };
	});
	response.json(returnedNotes);
});

notesRouter.get("/:id", async (request, response) => {
	const note = await Note.findById(request.params.id);
	if (note) {
		const returnedNote: NoteResponse = {
			content: note.content,
			important: note.important,
			id: note.id,
		};
		response.json(returnedNote);
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
			const savedNote = await note.save();

			const returnedNote: NoteResponse = {
				content: savedNote.content,
				important: savedNote.important,
				id: savedNote.id,
			};

			response.status(201).json(returnedNote);
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
		const returnedNote: NoteResponse = {
			content: updatedNote.content,
			important: updatedNote.important,
			id: updatedNote.id,
		};
		response.json(returnedNote);
	} else {
		response.status(404).end();
	}
});

export default notesRouter;
