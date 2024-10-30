"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import notaRoutes from "./nota.routes.js";
import asignaturaRoutes from "./asignatura.routes.js";
import cursoRoutes from "./curso.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/nota", notaRoutes)
    .use("/asignatura", asignaturaRoutes)
    .use("/curso", cursoRoutes)
    .use("/user", userRoutes);

export default router;