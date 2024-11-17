"use strict";
import { Router } from "express";
import {
    createAsignatura,
    deleteAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
} from "../controllers/asignatura.controller.js";

const router = Router();

router
    .get("/", getAsignaturas)
    .get("/detail", getAsignatura)
    .post("/", createAsignatura)
    .patch("/detail", updateAsignatura)
    .delete("/detail", deleteAsignatura);

export default router;
