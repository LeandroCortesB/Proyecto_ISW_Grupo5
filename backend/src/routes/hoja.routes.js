"use strict";
import { Router } from "express";
import { isProfesor} from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  getHoja,
  updateHoja,
} from "../controllers/hoja.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isProfesor);

router
    .get("/detail/",getHoja)
    .patch("/detail/",updateHoja);

export default router;
