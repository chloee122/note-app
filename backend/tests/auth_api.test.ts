import { test, afterEach, after, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../models/user";
import app from "../app";
import * as helper from "./test_helper";

const api = supertest(app);

describe("POST /auth/login", () => {
	afterEach(async () => {
		await User.deleteMany({});
	});
	test("retuns correct data when the credentials are correct", async () => {
		await helper.createTestUser();

		const response = await helper.postLogin(api, {
			username: helper.TEST_USER.valid.username,
			password: helper.TEST_USER.valid.password,
		});

		const { accessToken, refreshToken, username, name } = response.body;

		assert.strictEqual(username, helper.TEST_USER.valid.username.toLowerCase());
		assert.strictEqual(name, helper.TEST_USER.valid.name);
		assert.ok(accessToken);
		assert.ok(
			refreshToken && refreshToken !== helper.TEST_USER.valid.refreshToken
		);

		const accessTokenUsername = helper.getUsernameFromToken(accessToken);
		assert.strictEqual(
			accessTokenUsername,
			helper.TEST_USER.valid.username.toLowerCase()
		);

		const refreshTokenUsername = helper.getUsernameFromToken(refreshToken);
		assert.strictEqual(
			refreshTokenUsername,
			helper.TEST_USER.valid.username.toLowerCase()
		);
	});

	test("ignores cases in username and returns correct data with username in lowercase", async () => {
		await helper.createTestUser();

		const response = await helper.postLogin(api, {
			username: helper.TEST_USER.valid.upperCaseUsername,
			password: helper.TEST_USER.valid.password,
		});

		const { username } = response.body;

		assert.strictEqual(username, helper.TEST_USER.valid.username.toLowerCase());
	});

	test("returns 401 code and error message when the username or password is wrong", async () => {
		const invalidUsernameResponse = await helper.postLogin(
			api,
			{
				username: helper.TEST_USER.invalid.wrongUsername,
				password: helper.TEST_USER.valid.password,
			},
			401
		);

		assert.strictEqual(
			invalidUsernameResponse.body.error,
			"Invalid username or password"
		);

		const invalidPasswordResponse = await helper.postLogin(
			api,
			{
				username: helper.TEST_USER.valid.username,
				password: helper.TEST_USER.invalid.wrongPassword,
			},
			401
		);

		assert.strictEqual(
			invalidPasswordResponse.body.error,
			"Invalid username or password"
		);
	});

	test("returns 400 code and error message when username or password doesn't meet validation requirements", async () => {
		const invalidatedUsernameResponse = await helper.postLogin(
			api,
			{
				username: helper.TEST_USER.invalid.shortUsername,
				password: helper.TEST_USER.valid.password,
			},
			400
		);

		assert.strictEqual(
			invalidatedUsernameResponse.body.error,
			"Username with 6 or more characters is required"
		);

		const invalidatedPasswordResponse = await helper.postLogin(
			api,
			{
				username: helper.TEST_USER.valid.username,
				password: helper.TEST_USER.invalid.shortPassword,
			},
			400
		);

		assert.strictEqual(
			invalidatedPasswordResponse.body.error,
			"Password with 6 or more characters is required"
		);
	});
});

describe("POST auth/signup", () => {
	afterEach(async () => {
		await User.deleteMany({});
	});

	test("creates a new user with a refreshToken in database and returns correct data", async () => {
		const response = await helper.postSignUp(api, {
			name: helper.TEST_USER.valid.name,
			email: helper.TEST_USER.valid.primaryEmail,
			username: helper.TEST_USER.valid.username,
			password: helper.TEST_USER.valid.password,
		});

		const { accessToken, refreshToken, username, name } = response.body;

		const signedUpUser = await User.findOne({ username });

		assert.ok(signedUpUser);
		assert.strictEqual(signedUpUser.refreshToken, refreshToken);

		assert.strictEqual(username, helper.TEST_USER.valid.username.toLowerCase());
		assert.strictEqual(name, helper.TEST_USER.valid.name);
		assert.ok(accessToken);
		assert.ok(refreshToken);

		const accessTokenUsername = helper.getUsernameFromToken(accessToken);
		assert.strictEqual(
			accessTokenUsername,
			helper.TEST_USER.valid.username.toLowerCase()
		);

		const refreshTokenUsername = helper.getUsernameFromToken(refreshToken);
		assert.strictEqual(
			refreshTokenUsername,
			helper.TEST_USER.valid.username.toLowerCase()
		);
	});

	test("ignores cases in username and returns correct data with username in lowercase", async () => {
		const response = await helper.postSignUp(api, {
			name: helper.TEST_USER.valid.name,
			email: helper.TEST_USER.valid.primaryEmail,
			username: helper.TEST_USER.valid.upperCaseUsername,
			password: helper.TEST_USER.valid.password,
		});

		const { username } = response.body;
		assert.strictEqual(username, helper.TEST_USER.valid.username.toLowerCase());
	});

	test("returns 400 code and error message if username or email already exists", async () => {
		await helper.createTestUser();

		const emailExistsResponse = await helper.postSignUp(
			api,
			{
				name: helper.TEST_USER.valid.name,
				email: helper.TEST_USER.valid.primaryEmail,
				username: helper.TEST_USER.valid.username,
				password: helper.TEST_USER.valid.password,
			},
			400
		);
		assert.strictEqual(emailExistsResponse.body.error, "Email already exists");

		const userExistsResponse = await helper.postSignUp(
			api,
			{
				name: helper.TEST_USER.valid.name,
				email: helper.TEST_USER.valid.secondaryEmail,
				username: helper.TEST_USER.valid.username,
				password: helper.TEST_USER.valid.password,
			},
			400
		);
		assert.strictEqual(userExistsResponse.body.error, "User already exists");
	});

	describe("returns 400 code and error message", () => {
		test("when name is less than 3 characters", async () => {
			const response = await helper.postSignUp(
				api,
				{
					name: helper.TEST_USER.invalid.shortName,
					email: helper.TEST_USER.valid.primaryEmail,
					username: helper.TEST_USER.valid.username,
					password: helper.TEST_USER.valid.password,
				},
				400
			);

			assert.strictEqual(
				response.body.error,
				"Name with 3 or more characters is required"
			);
		});

		test("when email is empty", async () => {
			const response = await helper.postSignUp(
				api,
				{
					name: helper.TEST_USER.valid.name,
					email: helper.TEST_USER.invalid.emptyEmail,
					username: helper.TEST_USER.valid.username,
					password: helper.TEST_USER.valid.password,
				},
				400
			);

			assert.strictEqual(response.body.error, "Email is required");
		});

		test("when username is less than 6 characters", async () => {
			const response = await helper.postSignUp(
				api,
				{
					name: helper.TEST_USER.valid.name,
					email: helper.TEST_USER.valid.primaryEmail,
					username: helper.TEST_USER.invalid.shortUsername,
					password: helper.TEST_USER.valid.password,
				},
				400
			);

			assert.strictEqual(
				response.body.error,
				"Username with 6 or more characters is required"
			);
		});

		test("when password is less than 6 characters", async () => {
			const response = await helper.postSignUp(
				api,
				{
					name: helper.TEST_USER.valid.name,
					email: helper.TEST_USER.valid.primaryEmail,
					username: helper.TEST_USER.valid.username,
					password: helper.TEST_USER.invalid.shortPassword,
				},
				400
			);

			assert.strictEqual(
				response.body.error,
				"Password with 6 or more characters is required"
			);
		});
	});
});

after(async () => {
	await mongoose.connection.close();
});
