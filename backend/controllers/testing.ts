// const router = require("express").Router();
// const Note = require("../models/note");
// const User = require("../models/user");

import { Router } from "express";
import Note from "../models/note";
import User from "../models/user";

const router = Router();

router.post("/reset", async (_request, response) => {
	await Note.deleteMany({});
	await User.deleteMany({});

	response.status(204).end();
});

// module.exports = router;
export default router;
