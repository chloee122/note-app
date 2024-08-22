import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Note from "../models/note";
import getEnvVar from "../utils/getEnvVar";
import TestAgent from "supertest/lib/agent";
import { Test } from "supertest";

export const initialNotes = [
	{
		content: "HTML is easy",
		important: false,
	},
	{
		content: "Browser can execute only JavaScript",
		important: true,
	},
];

export const nonExistingId = async () => {
	const note = new Note({ content: "willremovethissoon" });
	await note.save();
	await note.deleteOne();

	return note._id.toString();
};

export const notesInDb = async () => {
	const notes = await Note.find({});
	return notes.map((note) => note.toJSON());
};

export const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

export const TEST_USER = {
	valid: {
		name: "Super User",
		primaryEmail: "test@gmail.com",
		secondaryEmail: "another@gmail.com",
		username: "superuser",
		upperCaseUsername: "Superuser",
		password: "123456",
		refreshToken: "ey1234TestToken"
	},
	invalid: {
		wrongUsername: "Superman",
		wrongPassword: "654321",
		shortName: "te ",
		shortUsername: "Super",
		emptyEmail: "",
		shortPassword: "123",
	},
};

export const createTestUser = async () => {
	const passwordHash = await bcrypt.hash(
		TEST_USER.valid.password,
		parseInt(getEnvVar("BCRYPT_SALT_ROUNDS"))
	);

	const user = new User({
		name: TEST_USER.valid.name,
		email: TEST_USER.valid.primaryEmail,
		username: TEST_USER.valid.username,
		passwordHash,
	});
	await user.save();
};

export const postLogin = async (
	api: TestAgent<Test>,
	credentials: { username: string; password: string },
	statusCode: number
) => {
	const response = await api
		.post("/api/auth/login")
		.send(credentials)
		.expect(statusCode)
		.expect("Content-Type", /application\/json/);

	return response;
};

export const postSignUp = async (
	api: TestAgent<Test>,
	signUpData: {
		name: string;
		email: string;
		username: string;
		password: string;
	},
	statusCode: number
) => {
	const response = await api
		.post("/api/auth/signup")
		.send(signUpData)
		.expect(statusCode)
		.expect("Content-Type", /application\/json/);

	return response;
};

export const getUsernameFromToken = (token: string): string => {
	const { username } = jwt.verify(
		token,
		getEnvVar("SECRET")
	) as jwt.JwtPayload;

	return username;
};
