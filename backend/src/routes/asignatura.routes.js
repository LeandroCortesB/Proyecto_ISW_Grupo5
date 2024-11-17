"use strict";
import { Router } from "express";
import {
    createAsignatura,
    deleteAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
} from "../controllers/asignatura.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isProfesor } from "../middlewares/authorization.middleware.js";
const router = Router();
router
    .use(authenticateJwt)
    .use(isProfesor);
router
    .get("/", getAsignaturas)
    .get("/:idAsignatura", getAsignatura)
    .post("/", createAsignatura)
    .patch("/:idAsignatura", updateAsignatura)
    .delete("/:idAsignatura", deleteAsignatura);

export default router;
