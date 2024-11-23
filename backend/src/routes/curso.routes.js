"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createCurso,
  deleteCurso,
  getCurso,
  getCursos,
  updateCurso,
} from "../controllers/curso.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/all", authorizeRoles(["administrador", "profesor"]), getCursos) 
  .get("/data", authorizeRoles(["administrador", "profesor"]), getCurso) 
  .post("/create", authorizeRoles(["administrador"]), createCurso) 
  .patch("/update", authorizeRoles(["administrador"]), updateCurso) 
  .delete("/del", authorizeRoles(["administrador"]), deleteCurso);

export default router;
//Primero por id
// controller en vez de query params