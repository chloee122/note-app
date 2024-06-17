import { Router } from "express";
import Note from "../models/note";
import User from "../models/user";

const router = Router();

router.post("/reset", async (_request, response) => {
	await Note.deleteMany({});
	await User.deleteMany({});

	response.status(204).end();
});

export default router;
