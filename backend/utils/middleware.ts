// const logger = require("./logger");
import logger from "./logger";
import { Request, Response, NextFunction } from "express";

const requestLogger = (request: Request, _response: Response, next:NextFunction) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (_request:Request, response:Response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: Error, _request:Request, response:Response, next:NextFunction) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).send({ error: error.message });
	} else if (
		error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
	) {
		return response
			.status(400)
			.json({ error: "expected `username` to be unique" });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: "token invalid" });
	} else if (error.name === "TokenExpiredError") {
		return response.status(401).json({
			error: "token expired",
		});
	}
	next(error);
};

// module.exports = {
// 	requestLogger,
// 	errorHandler,
// 	unknownEndpoint,
// };


export default {
	requestLogger,
	errorHandler,
	unknownEndpoint,
};