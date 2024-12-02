"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.use(authenticateJwt)

router
// comentario de prueba
  .get("/all",authorizeRoles(["administrador", "profesor"]), getUsers) 
  .get("/:id", authorizeRoles(["administrador", "profesor"]),getUser)
  .patch("/:id", authorizeRoles(["administrador", "profesor"]),updateUser)
  .delete("/:id", authorizeRoles(["administrador", "profesor"]),deleteUser);

export default router;