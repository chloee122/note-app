import { Router } from "express";
import Note from "../models/note";
import User from "../models/user";
import type { RequestWithUserId } from "../middleware";
import convertNoteModelToNoteResponse from "../utils/convertNoteModelToNoteResponse";

const notesRouter = Router();

export interface NoteResponse {
  id: string;
  title: string;
  htmlContent: string;
  plainTextContent: string;
  createdAt: string;
  updatedAt: string;
}

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({}).sort({ updatedAt: -1 });
  const notesToReponse: NoteResponse[] = notes.map(
    convertNoteModelToNoteResponse
  );
  response.json(notesToReponse);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    const noteToReponse: NoteResponse = convertNoteModelToNoteResponse(note);
    response.json(noteToReponse);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request: RequestWithUserId, response) => {
  const { title, htmlContent, plainTextContent } = request.body;
  const user = await User.findById(request.userId);
  if (!user) {
    response.status(403).json({ error: "Unauthorized user" });
  } else {
    const note = new Note({
      title,
      htmlContent,
      plainTextContent,
      userId: user.id,
    });
    const createdNote = await note.save();

    const noteToResponse: NoteResponse =
      convertNoteModelToNoteResponse(createdNote);

    response.status(201).json(noteToResponse);
  }
});

notesRouter.delete("/:id", async (request, response) => {
  const deletedNote = await Note.findByIdAndDelete(request.params.id);
  if (!deletedNote) {
    return response
      .status(404)
      .json({ error: "Failed to remove note. Note not found." });
  }

  response.status(204).end();
});

notesRouter.put("/:id", async (request, response) => {
  const { title, htmlContent, plainTextContent } = request.body;

  const note = {
    title,
    htmlContent,
    plainTextContent,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });
  if (updatedNote) {
    const noteToReponse: NoteResponse =
      convertNoteModelToNoteResponse(updatedNote);
    response.json(noteToReponse);
  } else {
    response.status(404).end();
  }
});

export default notesRouter;
