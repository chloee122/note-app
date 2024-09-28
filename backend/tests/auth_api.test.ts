import { test, beforeEach, afterEach, after, describe } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../models/user";
import app from "../app";
import {
  postLogin,
  postSignUp,
  createTestUser,
  TEST_USER,
  getUsernameFromToken,
} from "./test_helper";

enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}

const api = supertest(app);

describe("POST /auth/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("retuns correct data when the credentials are correct", async () => {
    const response = await postLogin(
      api,
      {
        username: TEST_USER.valid.username,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.OK
    );

    const { accessToken, refreshToken, username, name } = response.body;

    assert.strictEqual(username, TEST_USER.valid.username.toLowerCase());
    assert.strictEqual(name, TEST_USER.valid.name);
    assert.ok(accessToken);
    assert.ok(refreshToken && refreshToken !== TEST_USER.valid.refreshToken);

    const accessTokenUsername = getUsernameFromToken(accessToken);
    assert.strictEqual(
      accessTokenUsername,
      TEST_USER.valid.username.toLowerCase()
    );

    const refreshTokenUsername = getUsernameFromToken(refreshToken);
    assert.strictEqual(
      refreshTokenUsername,
      TEST_USER.valid.username.toLowerCase()
    );
  });

  test("ignores cases in username and returns correct data with username in lowercase", async () => {
    const response = await postLogin(
      api,
      {
        username: TEST_USER.valid.upperCaseUsername,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.OK
    );

    const { username } = response.body;

    assert.strictEqual(username, TEST_USER.valid.username.toLowerCase());
  });

  test("returns 401 code and error message when the username or password is wrong", async () => {
    const invalidUsernameResponse = await postLogin(
      api,
      {
        username: TEST_USER.invalid.wrongUsername,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.UNAUTHORIZED
    );

    assert.strictEqual(
      invalidUsernameResponse.body.error,
      "Invalid username or password"
    );

    const invalidPasswordResponse = await postLogin(
      api,
      {
        username: TEST_USER.valid.username,
        password: TEST_USER.invalid.wrongPassword,
      },
      STATUS_CODE.UNAUTHORIZED
    );

    assert.strictEqual(
      invalidPasswordResponse.body.error,
      "Invalid username or password"
    );
  });

  test("returns 400 code and error message when username or password doesn't meet validation requirements", async () => {
    const invalidatedUsernameResponse = await postLogin(
      api,
      {
        username: TEST_USER.invalid.shortUsername,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.BAD_REQUEST
    );

    assert.strictEqual(
      invalidatedUsernameResponse.body.error,
      "Username with 6 or more characters is required"
    );

    const invalidatedPasswordResponse = await postLogin(
      api,
      {
        username: TEST_USER.valid.username,
        password: TEST_USER.invalid.shortPassword,
      },
      STATUS_CODE.BAD_REQUEST
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
    const response = await postSignUp(
      api,
      {
        name: TEST_USER.valid.name,
        email: TEST_USER.valid.primaryEmail,
        username: TEST_USER.valid.username,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.CREATED
    );

    const { accessToken, refreshToken, username, name } = response.body;

    const signedUpUser = await User.findOne({ username });

    assert.ok(signedUpUser);
    assert.strictEqual(signedUpUser.refreshToken, refreshToken);

    assert.strictEqual(username, TEST_USER.valid.username.toLowerCase());
    assert.strictEqual(name, TEST_USER.valid.name);
    assert.ok(accessToken);
    assert.ok(refreshToken);

    const accessTokenUsername = getUsernameFromToken(accessToken);
    assert.strictEqual(
      accessTokenUsername,
      TEST_USER.valid.username.toLowerCase()
    );

    const refreshTokenUsername = getUsernameFromToken(refreshToken);
    assert.strictEqual(
      refreshTokenUsername,
      TEST_USER.valid.username.toLowerCase()
    );
  });

  test("ignores cases in username and returns correct data with username in lowercase", async () => {
    const response = await postSignUp(
      api,
      {
        name: TEST_USER.valid.name,
        email: TEST_USER.valid.primaryEmail,
        username: TEST_USER.valid.upperCaseUsername,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.CREATED
    );

    const { username } = response.body;
    assert.strictEqual(username, TEST_USER.valid.username.toLowerCase());
  });

  test("returns 400 code and error message if username or email already exists", async () => {
    await createTestUser();

    const emailExistsResponse = await postSignUp(
      api,
      {
        name: TEST_USER.valid.name,
        email: TEST_USER.valid.primaryEmail,
        username: TEST_USER.valid.username,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.BAD_REQUEST
    );
    assert.strictEqual(emailExistsResponse.body.error, "Email already exists");

    const userExistsResponse = await postSignUp(
      api,
      {
        name: TEST_USER.valid.name,
        email: TEST_USER.valid.secondaryEmail,
        username: TEST_USER.valid.username,
        password: TEST_USER.valid.password,
      },
      STATUS_CODE.BAD_REQUEST
    );
    assert.strictEqual(userExistsResponse.body.error, "User already exists");
  });

  describe("returns 400 code and error message", () => {
    test("when name is less than 3 characters", async () => {
      const response = await postSignUp(
        api,
        {
          name: TEST_USER.invalid.shortName,
          email: TEST_USER.valid.primaryEmail,
          username: TEST_USER.valid.username,
          password: TEST_USER.valid.password,
        },
        STATUS_CODE.BAD_REQUEST
      );

      assert.strictEqual(
        response.body.error,
        "Name with 3 or more characters is required"
      );
    });

    test("when email is empty", async () => {
      const response = await postSignUp(
        api,
        {
          name: TEST_USER.valid.name,
          email: TEST_USER.invalid.emptyEmail,
          username: TEST_USER.valid.username,
          password: TEST_USER.valid.password,
        },
        STATUS_CODE.BAD_REQUEST
      );

      assert.strictEqual(response.body.error, "Email is required");
    });

    test("when username is less than 6 characters", async () => {
      const response = await postSignUp(
        api,
        {
          name: TEST_USER.valid.name,
          email: TEST_USER.valid.primaryEmail,
          username: TEST_USER.invalid.shortUsername,
          password: TEST_USER.valid.password,
        },
        STATUS_CODE.BAD_REQUEST
      );

      assert.strictEqual(
        response.body.error,
        "Username with 6 or more characters is required"
      );
    });

    test("when password is less than 6 characters", async () => {
      const response = await postSignUp(
        api,
        {
          name: TEST_USER.valid.name,
          email: TEST_USER.valid.primaryEmail,
          username: TEST_USER.valid.username,
          password: TEST_USER.invalid.shortPassword,
        },
        STATUS_CODE.BAD_REQUEST
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
