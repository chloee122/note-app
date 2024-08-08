import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../models/user";
import getEnvVar from "../utils/getEnvVar";
import * as middleware from "../middleware";

const authRouter = Router();

authRouter.post("/", async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });
	const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password",
		});
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, getEnvVar("SECRET"), {
		expiresIn: 60 * 60,
	});

	response.status(200).send({
		token,
		username: user.username,
		name: user.name,
	});
});

authRouter.post("/sign-up", middleware.validateSignUpData ,async (request, response) => {
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

	const token = jwt.sign({ id: user.id }, getEnvVar("SECRET"), {
		expiresIn: 60 * 60,
	});

	response.status(201).json({
		token,
		username: createdUser.username,
		name: createdUser.name
	});
});

export default authRouter;