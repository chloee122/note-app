import User from "../models/user";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", async (_request, response) => {
	const users = await User.find({});
	response.json(users);
});

export default usersRouter;