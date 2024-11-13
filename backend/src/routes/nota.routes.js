"use strict";
import { Router } from "express";
import {
  createNota,
  deleteNota,
  getNota,
  getNotas,
  updateNota,
} from "../controllers/nota.controller.js";

const router = Router();
router
  .get("/", getNotas)          // Ruta para obtener todas las notas
  .get("/:idNota", getNota)      // Ruta para obtener una nota específica
  .post("/", createNota)        // Ruta para crear una nueva nota
  .patch("/:idNota", updateNota) // Ruta para actualizar una nota específica
  .delete("/:idNota", deleteNota); // Ruta para eliminar una nota específica

export default router;

