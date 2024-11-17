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
  .get("/all", getCursos)         // Ruta para obtener todos los cursos
  .get("/data", getCurso)     // Ruta para obtener un curso específico
  .post("/create", createCurso) // Ruta para crear un curso
  .patch("/update", updateCurso) // Ruta para actualizar un curso específico
  .delete("/del", deleteCurso); // Ruta para eliminar un curso específico

export default router;
