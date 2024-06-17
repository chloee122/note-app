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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}).populate("notes", {
        content: 1,
        important: 1,
    });
    response.json(users);
}));
usersRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password } = request.body;
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new user_1.default({
        username,
        name,
        passwordHash,
    });
    const savedUser = yield user.save();
    response.status(201).json(savedUser);
}));
exports.default = usersRouter;
