"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const test_helper_1 = __importDefault(require("./test_helper"));
const app_1 = __importDefault(require("../app"));
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const api = (0, supertest_1.default)(app_1.default);
(0, node_test_1.describe)("when there are initially some notes saved", () => {
    (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield note_1.default.deleteMany({});
        // const noteObjects = helper.initialNotes.map((note) => new Note(note));
        // const promiseArray = noteObjects.map((note) => note.save());
        // await Promise.all(promiseArray);
        yield note_1.default.insertMany(test_helper_1.default.initialNotes);
    }));
    (0, node_test_1.test)("notes are returned as json", () => __awaiter(void 0, void 0, void 0, function* () {
        yield api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }));
    (0, node_test_1.test)("all notes are returned", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/api/notes");
        node_assert_1.default.strictEqual(response.body.length, test_helper_1.default.initialNotes.length);
    }));
    (0, node_test_1.test)("a specific note is within the returned notes", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/api/notes");
        const contents = response.body.map((e) => e.content);
        (0, node_assert_1.default)(contents.includes("HTML is easy"));
    }));
    (0, node_test_1.describe)("view a specific note", () => {
        (0, node_test_1.test)("succeeds with a valid id", () => __awaiter(void 0, void 0, void 0, function* () {
            const notesAtStart = yield test_helper_1.default.notesInDb();
            const noteToView = notesAtStart[0];
            const resultNote = yield api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);
            node_assert_1.default.deepStrictEqual(resultNote.body, noteToView);
        }));
        (0, node_test_1.test)("fails with statuscode 404 if note does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const validNonExistingId = yield test_helper_1.default.nonExistingId();
            yield api.get(`/api/notes/${validNonExistingId}`).expect(404);
        }));
    });
    let token;
    (0, node_test_1.describe)("addition of new note", () => {
        (0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
            // Reset
            yield user_1.default.deleteMany({});
            // Create user
            const userToCreate = {
                username: "test",
                password: "salainen",
                name: "test",
            };
            yield api.post("/api/users").send(userToCreate);
            // Login to get token
            const user = {
                username: "test",
                password: "salainen",
            };
            const result = yield api.post("/api/login").send(user);
            token = result.body.token;
        }));
        (0, node_test_1.test)("succeeds with valid data", () => __awaiter(void 0, void 0, void 0, function* () {
            const newNote = {
                content: "async/await simplifies making async calls",
                important: true,
            };
            yield api
                .post("/api/notes")
                .set("Authorization", `Bearer ${token}`)
                .send(newNote)
                .expect(201)
                .expect("Content-Type", /application\/json/);
            const notesAtEnd = yield test_helper_1.default.notesInDb();
            node_assert_1.default.strictEqual(notesAtEnd.length, test_helper_1.default.initialNotes.length + 1);
            const content = notesAtEnd.map((n) => n.content);
            (0, node_assert_1.default)(content.includes("async/await simplifies making async calls"));
        }));
        (0, node_test_1.test)("fails with status code 400 if data invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const newNote = {
                important: true,
            };
            yield api
                .post("/api/notes")
                .set("Authorization", `Bearer ${token}`)
                .send(newNote)
                .expect(400);
            const notesAtEnd = yield test_helper_1.default.notesInDb();
            node_assert_1.default.strictEqual(notesAtEnd.length, test_helper_1.default.initialNotes.length);
        }));
    });
    (0, node_test_1.describe)("deletion of a note", () => {
        (0, node_test_1.test)("succeeds with status code 204 if id is valid ", () => __awaiter(void 0, void 0, void 0, function* () {
            const notesAtStart = yield test_helper_1.default.notesInDb();
            const noteToDelete = notesAtStart[0];
            yield api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
            const notesAtEnd = yield test_helper_1.default.notesInDb();
            node_assert_1.default.strictEqual(notesAtEnd.length, notesAtStart.length - 1);
            const contents = notesAtEnd.map((n) => n.content);
            (0, node_assert_1.default)(!contents.includes(noteToDelete.content));
        }));
    });
});
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
