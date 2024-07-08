"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./utils/config"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const notes_1 = __importDefault(require("./controllers/notes"));
const login_1 = __importDefault(require("./controllers/login"));
const users_1 = __importDefault(require("./controllers/users"));
const testing_1 = __importDefault(require("./controllers/testing"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./utils/logger"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const redirectToRoot_1 = __importDefault(require("./controllers/redirectToRoot"));
const app = (0, express_1.default)();
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.set("strictQuery", false);
    logger_1.default.info("connecting to", config_1.default.MONGODB_URI);
    mongoose_1.default
        .connect(config_1.default.MONGODB_URI)
        .then((_result) => {
        console.log("connected to MongoDB");
    })
        .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });
}
if (process.env.NODE_ENV !== "production") {
    app.use((0, cors_1.default)());
}
app.use(express_1.default.static("dist"));
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use("/api/notes", notes_1.default);
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
app.use("*", redirectToRoot_1.default);
if (process.env.NODE_ENV === "test") {
    app.use("/api/end-to-end-testing", testing_1.default);
}
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
