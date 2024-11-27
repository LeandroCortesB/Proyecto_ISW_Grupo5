"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  getHoja,
  updateHoja,
} from "../controllers/hoja.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);

router
    .get("/",authorizeRoles(["administrador", "profesor"]), getHoja)
    .patch("/update",authorizeRoles(["administrador", "profesor"]), updateHoja);

export default router;
