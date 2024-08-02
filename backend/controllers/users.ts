import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Router } from "express";
import getEnvVar from "../utils/getEnvVar";
import * as middleware from "../middleware";

const usersRouter = Router();

usersRouter.get("/", async (_request, response) => {
	const users = await User.find({});
	response.json(users);
});

usersRouter.post("/sign-up", middleware.validateSignUpData ,async (request, response) => {
	const { name, email, username, password } = request.body;

	const emailExists = await User.findOne({
		email
	});
	const userExists = await User.findOne({
		username
	});

	if (emailExists) {
		return response.status(400).json( { error: "Email already exists" } );
	} else if (userExists) {
		return response.status(400).json( { error: "User already exists" } );
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		email,
		username,
		passwordHash,
	});

	const createdUser = await user.save();

	const token = jwt.sign({ userId: user.id }, getEnvVar("SECRET"));

	response.status(201).json({
		token,
		username: createdUser.username,
		name: createdUser.name
	});
});

export default usersRouter;