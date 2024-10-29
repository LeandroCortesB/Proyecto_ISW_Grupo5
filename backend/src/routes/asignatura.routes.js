"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createAsignatura,
    deleteAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
} from "../controllers/asignatura.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/", getAsignaturas)
    .get("/detail", getAsignatura)
    .post("/", createAsignatura)
    .patch("/detail", updateAsignatura)
    .delete("/detail", deleteAsignatura);

export default router;
