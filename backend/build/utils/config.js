"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const PORT = process.env.PORT;
exports.default = { MONGODB_URI, PORT };
