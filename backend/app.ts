import express from "express";
import config from "./utils/config";
/// check export
import cors from "cors";
import notesRouter from "./controllers/notes";
import loginRouter from "./controllers/login";
import usersRouter from "./controllers/users";
import mongoose from "mongoose";
import logger from "./utils/logger";
import middleware from "./utils/middleware";

// const config = require("./utils/config");
// const express = require("express");
require("express-async-errors");
const app = express();
// const cors = require("cors");
// const notesRouter = require("./controllers/notes");
// const usersRouter = require("./controllers/users");
// const loginRouter = require("./controllers/login");
// const middleware = require("./utils/middleware");
// const logger = require("./utils/logger");
// const mongoose = require("mongoose");

if(config.MONGODB_URI){
	mongoose.set("strictQuery", false);
	logger.info("connecting to", config.MONGODB_URI);

	mongoose
		.connect(config.MONGODB_URI)

		.then((_result) => {
			console.log("connected to MongoDB");
		})
		.catch((error) => {
			console.log("error connecting to MongoDB:", error.message);
		});
}

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing");
	app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// module.exports = app;
export default app;
