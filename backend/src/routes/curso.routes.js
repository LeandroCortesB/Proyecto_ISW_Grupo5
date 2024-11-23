"use strict";
import { Router } from "express";
import {  isAdmin, isProfesor } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createCurso,
  deleteCurso,
  getCurso,
  getCursos,
  updateCurso,
} from "../controllers/curso.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/all", getCursos)        
  .get("/data", getCurso)    
  .post("/create", createCurso) 
  .patch("/update", updateCurso) 
  .delete("/del", deleteCurso);

export default router;
