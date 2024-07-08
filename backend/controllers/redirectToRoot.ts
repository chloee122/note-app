import { Router } from "express";

const redirectToRootRouter = Router();

redirectToRootRouter.get("/", (_request, response) => {
  response.redirect("/");
});

export default redirectToRootRouter;
