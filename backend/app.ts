import express from "express";
import config from "./utils/config";
import "express-async-errors";
import cors from "cors";
import notesRouter from "./controllers/notes";
import authRouter from "./controllers/auth";
import usersRouter from "./controllers/users";
import testingRouter from "./controllers/testing";
import mongoose from "mongoose";
import logger from "./utils/logger";
import * as middleware from "./middleware";
import redirectToRootRouter from "./controllers/redirectToRoot";

const app = express();

if (config.MONGODB_URI) {
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

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", middleware.validateToken, notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("*", redirectToRootRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/end-to-end-testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
