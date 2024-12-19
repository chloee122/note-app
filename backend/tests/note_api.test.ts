import { test, describe, after, before, beforeEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import {
  getValuesFromToken,
  initialNotes,
  notesInDb,
  getNonExistingNoteId,
} from "./test_helper";
import app from "../app";
import Note from "../models/note";
import User from "../models/user";

const api = supertest(app);
let token: string;
let userId: string;

describe("when there are initially some notes saved", () => {
  before(async () => {
    // Reset
    await User.deleteMany({});

    // Create user
    const userToCreate = {
      username: "test_user",
      password: "salainen",
      name: "test",
      email: "test1@gmail.com",
    };
    await api.post("/api/auth/signup").send(userToCreate);

    // Login to get token
    const user = {
      username: "test_user",
      password: "salainen",
    };
    const result = await api.post("/api/auth/login").send(user);
    token = result.body.accessToken;

    // Get userId
    userId = getValuesFromToken(token).id;
  });

  beforeEach(async () => {
    // Reset
    await Note.deleteMany({});

    // Add userId to notes
    const notes = initialNotes.map((note) => {
      note.userId = userId;
      return note;
    });

    // Insert notes to db
    await Note.insertMany(notes);
  });

  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    const titles = response.body.map((e: { title: string }) => e.title);
    assert(titles.includes("A sample note to test api"));
  });

  describe("view a specific note", () => {
    test("succeeds with a valid id", async () => {
      const notesAtStart = await notesInDb();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId: _, ...noteToView } = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonExistingId = await getNonExistingNoteId(userId);

      await api
        .get(`/api/notes/${validNonExistingId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  describe("addition of new note", () => {
    test("succeeds with valid data", async () => {
      const newNote = {
        title: "async/await simplifies making async calls",
        htmlContent:
          "<p>A developer must know how to work with async functions</p>",
        plainTextContent:
          "A developer must know how to work with async functions",
      };

      await api
        .post("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await notesInDb();
      assert.strictEqual(notesAtEnd.length, initialNotes.length + 1);

      const titles = notesAtEnd.map((n) => n.title);
      assert(titles.includes("async/await simplifies making async calls"));
    });

    test("fails with status code 400 if data invalid", async () => {
      const newNote = {
        important: true,
      };

      await api
        .post("/api/notes")
        .set("Authorization", `Bearer ${token}`)
        .send(newNote)
        .expect(400);

      const notesAtEnd = await notesInDb();
      assert.strictEqual(notesAtEnd.length, initialNotes.length);
    });
  });

  describe("deletion of a note", () => {
    test("succeeds with status code 204 if id is valid ", async () => {
      const notesAtStart = await notesInDb();
      const noteToDelete = notesAtStart[0];

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const notesAtEnd = await notesInDb();
      assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);

      const titles = notesAtEnd.map((n) => n.title);
      assert(!titles.includes(noteToDelete.title));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
