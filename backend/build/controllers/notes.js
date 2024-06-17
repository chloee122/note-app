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
const express_1 = require("express");
const note_1 = __importDefault(require("../models/note"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notesRouter = (0, express_1.Router)();
const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};
notesRouter.get("/", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find({});
    response.json(notes);
}));
notesRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_1.default.findById(request.params.id);
    if (note) {
        response.json(note);
    }
    else {
        response.status(404).end();
    }
}));
notesRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const token = getTokenFrom(request);
    if (process.env.SECRET && token) {
        // CHECK
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET); // Check again
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token invalid" });
        }
        const user = yield user_1.default.findById(decodedToken.id);
        if (user) {
            const note = new note_1.default({
                content: body.content,
                important: body.important || false,
                user: user.id,
            });
            const savedNote = yield note.save();
            user.notes = user.notes.concat(savedNote._id);
            yield user.save();
            response.status(201).json(savedNote);
        }
    }
}));
notesRouter.delete("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield note_1.default.findByIdAndDelete(request.params.id);
    response.status(204).end();
}));
notesRouter.put("/:id", (request, response, next) => {
    const body = request.body;
    const note = {
        content: body.content,
        important: body.important,
    };
    note_1.default.findByIdAndUpdate(request.params.id, note, { new: true })
        .then((updatedNote) => {
        response.json(updatedNote);
    })
        .catch((error) => next(error));
});
exports.default = notesRouter;
