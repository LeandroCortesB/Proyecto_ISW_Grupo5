"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createUser,
  deleteUser,
  getAlumnos,
  getUser,
  getUsers,
  getUsersByAsignatura,
  getUsersByCurso,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticateJwt)

router
  .get("/all",authorizeRoles(["administrador", "profesor"]), getUsers) 
  .get("/:id", authorizeRoles(["administrador", "profesor"]),getUser)
  .get("/hoja/:rut", authorizeRoles(["administrador", "profesor","alumno","apoderado"]),getUser)
  .post("/", authorizeRoles(["administrador", "profesor"]),createUser)
  .get("/curso/:id", authorizeRoles(["administrador", "profesor"]),getUsersByCurso)
  .get("/asignatura/:idAsignatura", authorizeRoles(["administrador", "profesor"]),getUsersByAsignatura)
  .get("/alumnos/all", authorizeRoles(["administrador", "profesor"]),getAlumnos)
  .patch("/:id", authorizeRoles(["administrador", "profesor"]),updateUser)
  .delete("/:id", authorizeRoles(["administrador", "profesor"]),deleteUser);

export default router;