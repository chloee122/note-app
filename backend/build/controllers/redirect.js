"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redirectRouter = (0, express_1.Router)();
redirectRouter.get("/", (_request, response) => {
    response.redirect("/");
});
exports.default = redirectRouter;
