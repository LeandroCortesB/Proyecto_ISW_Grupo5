"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { 
    createAsistencia,
    deleteAsistencia,
    getAsistencia,
    getAsistenciaByAlumno,
    getAsistencias,
    updateAsistencia,
} from "../controllers/asistencia.controller.js";

import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt)

router
    .get("/all",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]),getAsistencias) 
    .get("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), getAsistencia) 
    .get("/users/:rut",authorizeRoles(["administrador","alumno"]),getAsistenciaByAlumno)
    .post("/",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), createAsistencia) 
    .patch("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), updateAsistencia) 
    .delete("/:idAsistencia",authorizeRoles(["administrador", "profesor","alumno","usuario"
        ,"apoderado"]), deleteAsistencia); 

export default router;