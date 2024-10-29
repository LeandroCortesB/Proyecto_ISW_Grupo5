"use strict";
import { Router } from "express";
import {
  createCurso,
  deleteCurso,
  getCurso,
  getCursos,
  updateCurso,
} from "../controllers/curso.controller.js";

const router = Router();

router
  .get("/", getCursos)         // Ruta para obtener todos los cursos
  .get("/detail", getCurso)     // Ruta para obtener un curso específico
  .post("/", createCurso) // Ruta para crear un curso
  .patch("/detail", updateCurso) // Ruta para actualizar un curso específico
  .delete("/detail", deleteCurso); // Ruta para eliminar un curso específico

export default router;
