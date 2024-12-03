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
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticateJwt)

router
  .get("/:id",authorizeRoles(["administrador", "profesor"]), getUsers)
  .get("/", authorizeRoles(["administrador", "profesor"]),getUser)
  .post("/", authorizeRoles(["administrador", "profesor"]),createUser)
  .get("/", authorizeRoles(["administrador", "profesor"]),getAlumnos)
  .patch("/:id", authorizeRoles(["administrador", "profesor"]),updateUser)
  .delete("/:id", authorizeRoles(["administrador", "profesor"]),deleteUser);

export default router;