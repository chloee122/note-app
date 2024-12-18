// import { test, describe, after, beforeEach } from "node:test";
// import assert from "node:assert";
// import supertest from "supertest";
// import mongoose from "mongoose";
// import * as helper from "./test_helper";
// import app from "../app";
// import Note from "../models/note";
// import User from "../models/user";

// const api = supertest(app);

// describe("when there are initially some notes saved", () => {
//   beforeEach(async () => {
//     await Note.deleteMany({});

//     // const noteObjects = helper.initialNotes.map((note) => new Note(note));
//     // const promiseArray = noteObjects.map((note) => note.save());
//     // await Promise.all(promiseArray);

//     await Note.insertMany(helper.initialNotes);
//   });

//   test("notes are returned as json", async () => {
//     await api
//       .get("/api/notes")
//       .expect(200)
//       .expect("Content-Type", /application\/json/);
//   });

//   test("all notes are returned", async () => {
//     const response = await api.get("/api/notes");
//     assert.strictEqual(response.body.length, helper.initialNotes.length);
//   });

//   test("a specific note is within the returned notes", async () => {
//     const response = await api.get("/api/notes");

//     const contents = response.body.map(
//       (e: { content: string; important: boolean }) => e.content
//     );
//     assert(contents.includes("HTML is easy"));
//   });

//   describe("view a specific note", () => {
//     test("succeeds with a valid id", async () => {
//       const notesAtStart = await helper.notesInDb();

//       const noteToView = notesAtStart[0];

//       const resultNote = await api
//         .get(`/api/notes/${noteToView.id}`)
//         .expect(200)
//         .expect("Content-Type", /application\/json/);

//       assert.deepStrictEqual(resultNote.body, noteToView);
//     });

//     test("fails with statuscode 404 if note does not exist", async () => {
//       const validNonExistingId = await helper.nonExistingId();

//       await api.get(`/api/notes/${validNonExistingId}`).expect(404);
//     });
//   });

//   let token: string;
//   describe("addition of new note", () => {
//     beforeEach(async () => {
//       // Reset
//       await User.deleteMany({});

//       // Create user
//       const userToCreate = {
//         username: "test",
//         password: "salainen",
//         name: "test",
//       };
//       await api.post("/api/users").send(userToCreate);

//       // Login to get token
//       const user = {
//         username: "test",
//         password: "salainen",
//       };
//       const result = await api.post("/api/login").send(user);
//       token = result.body.token;
//     });
//     test("succeeds with valid data", async () => {
//       const newNote = {
//         content: "async/await simplifies making async calls",
//         important: true,
//       };

//       await api
//         .post("/api/notes")
//         .set("Authorization", `Bearer ${token}`)
//         .send(newNote)
//         .expect(201)
//         .expect("Content-Type", /application\/json/);

//       const notesAtEnd = await helper.notesInDb();
//       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

//       const content = notesAtEnd.map((n) => n.content);
//       assert(content.includes("async/await simplifies making async calls"));
//     });

//     test("fails with status code 400 if data invalid", async () => {
//       const newNote = {
//         important: true,
//       };

//       await api
//         .post("/api/notes")
//         .set("Authorization", `Bearer ${token}`)
//         .send(newNote)
//         .expect(400);

//       const notesAtEnd = await helper.notesInDb();
//       assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
//     });
//   });

//   describe("deletion of a note", () => {
//     test("succeeds with status code 204 if id is valid ", async () => {
//       const notesAtStart = await helper.notesInDb();
//       const noteToDelete = notesAtStart[0];

//       await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

//       const notesAtEnd = await helper.notesInDb();
//       assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);

//       const contents = notesAtEnd.map((n) => n.content);
//       assert(!contents.includes(noteToDelete.content));
//     });
//   });
// });

// after(async () => {
//   await mongoose.connection.close();
// });
