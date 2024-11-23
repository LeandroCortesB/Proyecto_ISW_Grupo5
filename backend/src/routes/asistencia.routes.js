"use strict";
import { Router } from "express";
import { 
    createAsistencia,
    deleteAsistencia,
    getAsistencia,
    getAsistencias,
    updateAsistencia,
} from "../controllers/asistencia.controller.js";

const router = Router();

router
    .get("/", getAsistencias) // Ruta para obtener todas las asistencias
    .get("/detail", getAsistencia) // Ruta para obtener una asistencia específica
    .post("/", createAsistencia) // Ruta para crear una asistencia
    .patch("/detail", updateAsistencia) // Ruta para actualizar una asistencia específica
    .delete("/detail", deleteAsistencia); // Ruta para eliminar una asistencia específica