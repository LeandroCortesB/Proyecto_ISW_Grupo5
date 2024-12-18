"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import notaRoutes from "./nota.routes.js";
import asignaturaRoutes from "./asignatura.routes.js";
import asistenciaRoutes from "./asistencia.routes.js";
import cursoRoutes from "./curso.routes.js";
import hojaRoutes from "./hoja.routes.js";
import paginaRoutes from "./pagina.routes.js";
import emailRoutes from "./email.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/nota", notaRoutes)
    .use("/asignatura", asignaturaRoutes)
    .use("/asistencia", asistenciaRoutes)
    .use("/curso", cursoRoutes)
    .use("/pagina", paginaRoutes)
    .use("/hoja", hojaRoutes)
    .use("/perfil", userRoutes)
    .use("/user", userRoutes)
    .use("/email", emailRoutes);

export default router;