"use strict";
import { Router } from "express";
import { isProfesor } from "../middlewares/authorization.middleware.js";
import {
  createCurso,
  deleteCurso,
  getCurso,
  getCursos,
  updateCurso,
} from "../controllers/curso.controller.js";

const router = Router();

router
    .use(isProfesor);

router
  .get("/all", getCursos)        
  .get("/data", getCurso)    
  .post("/create", createCurso) 
  .patch("/update", updateCurso) 
  .delete("/del", deleteCurso);

export default router;
