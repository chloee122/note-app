// const bcrypt = require("bcrypt");
// const usersRouter = require("express").Router();
// const User = require("../models/user");

import bcrypt from "bcrypt";
import User from "../models/user";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", async (_request, response) => {
	const users = await User.find({}).populate("notes", {
		content: 1,
		important: 1,
	});

	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

// module.exports = usersRouter;
export default usersRouter;
