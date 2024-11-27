"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
    createAsignatura,
    deleteAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
} from "../controllers/asignatura.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt)


router
    .get("/all",  authorizeRoles(["administrador", "profesor"]),getAsignaturas)
    .get("/:idAsignatura",  authorizeRoles(["administrador", "profesor"]),getAsignatura)
    .post("/", authorizeRoles(["administrador", "profesor"]), createAsignatura)
    .patch("/:idAsignatura", authorizeRoles(["administrador", "profesor"]), updateAsignatura)
    .delete("/:idAsignatura",  authorizeRoles(["administrador", "profesor"]),deleteAsignatura);

export default router;
