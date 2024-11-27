"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { 
    createAsistencia,
    deleteAsistencia,
    getAsistencia,
    getAsistencias,
    updateAsistencia,
} from "../controllers/asistencia.controller.js";

import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt)

router
    .get("/all",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]),getAsistencias) // Ruta para obtener todas las asistencias
    .get("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), getAsistencia) // Ruta para obtener una asistencia específica
    .post("/",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), createAsistencia) // Ruta para crear una asistencia
    .patch("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), updateAsistencia) // Ruta para actualizar una asistencia específica
    .delete("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), deleteAsistencia); // Ruta para eliminar una asistencia específica

export default router;