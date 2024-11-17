"use strict";
import { Router } from "express";
import { isProfesor } from "../middlewares/authorization.middleware.js";
import {
    createAsignatura,
    deleteAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
} from "../controllers/asignatura.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isProfesor);


router
    .get("/all", getAsignaturas)
    .get("/data", getAsignatura)
    .post("/create", createAsignatura)
    .patch("/update", updateAsignatura)
    .delete("/delete", deleteAsignatura);

export default router;
