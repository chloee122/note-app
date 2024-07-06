import { Router } from "express";

const redirectRouter = Router();

redirectRouter.get("/", (_request, response) => {
  response.redirect("/");
});

export default redirectRouter;
