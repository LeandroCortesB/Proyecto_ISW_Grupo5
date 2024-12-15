"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createHoja,
  deleteHoja,
  getHoja,
  getHojas,
  updateHoja,
} from "../controllers/hoja.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);

router
    .get("/:idHoja",authorizeRoles(["administrador", "profesor","alumno","apoderado"]), getHoja)
    .get("/all/:rut",authorizeRoles(["administrador", "profesor","alumno","apoderado"]), getHojas)
    .post("/", authorizeRoles(["administrador", "profesor"]),createHoja)
    .patch("/:idHoja",authorizeRoles(["administrador", "profesor"]), updateHoja)
    .delete("/del/:idHoja", authorizeRoles(["administrador", "profesor"]),deleteHoja);

export default router;
