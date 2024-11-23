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
  .get("/all",authorizeRoles(["administrador", "profesor"]), getUsers)
  .get("/data", authorizeRoles(["administrador", "profesor"]),getUser)
  .patch("/update", authorizeRoles(["administrador", "profesor"]),updateUser)
  .delete("/del", authorizeRoles(["administrador", "profesor"]),deleteUser);

export default router;