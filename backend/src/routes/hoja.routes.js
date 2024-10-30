"use strict";
import { Router } from "express";
import { isProfesor } from "../middlewares/authorization.middleware.js";
import {
  getHoja,
  updateHoja,
} from "../controllers/hoja.controller.js";

const router = Router();

router
    .use(isProfesor);

router
    .get("/detail/",getHoja)
    .patch("/detail/",updateHoja);

export default router;
