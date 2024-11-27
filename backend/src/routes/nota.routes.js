"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import {
  createNota,
  deleteNota,
  getNota,
  getNotas,
  updateNota,
} from "../controllers/nota.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/all", authorizeRoles(["administrador", "profesor"]),getNotas)         
  .get("/data", authorizeRoles(["administrador", "profesor"]),getNota)      
  .post("/",authorizeRoles(["administrador", "profesor"]), createNota)       
  .patch("/update",authorizeRoles(["administrador", "profesor"]), updateNota) 
  .delete("/delete",authorizeRoles(["administrador", "profesor"]), deleteNota); 

export default router;

